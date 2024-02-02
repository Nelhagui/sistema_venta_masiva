<?php

namespace App\Http\Controllers;

use App\Models\Comercio;
use App\Models\DetalleVenta;
use App\Models\Producto;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Lote;
use App\Models\Pago;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $ventas = Venta::orderBy('created_at', 'desc')->paginate(15);
        return view('ventas.index', compact('ventas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $venta = Venta::with('detalles')->find($id);
        return view('ventas.show', compact('venta'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // FUNCIONES AUXILIARES 
    private function obtenerTotalCostos($productos)
    {
        $total_costo = 0;
        foreach ($productos as $producto) {
            $productoEnDb = Producto::find($producto['id']);
            $costo = $productoEnDb->precio_costo * $producto['cantidad'];
            $total_costo = $total_costo + $costo;
        }
        return $total_costo;
    }
    private function obtenerTotalVentas($productos)
    {
        $total_valor_venta = 0;
        foreach ($productos as $producto) {
            $productoEnDb = Producto::find($producto['id']);
            $valor_venta = $productoEnDb->precio_venta * $producto['cantidad'];
            $total_valor_venta = $total_valor_venta + $valor_venta;
        }
        return $total_valor_venta;
    }



    // API
    public function indexApi()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $ventas = Venta::where('comercio_id', $id_comercio)
            ->whereHas('cliente') // Filtra las ventas que tienen un cliente asociado
            ->orWhereNull('cliente_id') // Incluye las ventas donde el cliente es nulo
            ->with(['cliente', 'sesionCaja.cajero']) // Carga los datos del cliente asociado, si existe
            ->get();
        return $ventas;
    }
    public function storeApi(Request $request)
    {
        try {
            // Obtén el usuario logueado
            $user = Auth::user();
            // Obtén la última sesión de caja abierta del usuario
            $ultimaSesionCaja = $user->ultimaSesionCajaAbierta()->first();

            // Si $ultimaSesionCaja es null, se ejecuta el bloque else, de lo contrario, simplemente no se hace nada
            if (!$ultimaSesionCaja) {
                return response()->json(['error' => 'No se encontró una sesión de caja abierta para este usuario.'], 404);
            }

            DB::beginTransaction(); // Inicia la transacción

            // 1 CREO VENTA
            $venta = new Venta;
            $venta->sesion_caja_id = $ultimaSesionCaja->id;
            $venta->user_id = $user->id;
            $venta->monto_total_costo = $this->obtenerTotalCostos($request->productos);
            $venta->monto_total_venta = $this->obtenerTotalVentas($request->productos);
            $venta->cliente_id = $request['cliente'];
            $venta->fecha_hora_venta = now();
            $venta->metodos_de_pago = $request['metodoPago'] ?? 1;
            $venta->estado_pago = $request['estadoPago'] ?? "cobrada";
            $venta->comercio_id = $user->comercio_id;
            $venta->save();

            // 2 CREO DETALLE DE VENTAS
            foreach ($request->productos as $producto) {
                $productoEnDb = Producto::find($producto['id']);
                if (!$productoEnDb) {
                    DB::rollBack(); // Revierte la transacción si un producto no se encuentra
                    throw new \Exception('Producto no encontrado: ' . $producto['id']);
                }

                $detalle_venta = new DetalleVenta;
                $detalle_venta->venta_id = $venta->id;
                $detalle_venta->producto_id = $productoEnDb->id;
                $detalle_venta->nombre_producto = $productoEnDb->titulo;
                $detalle_venta->cantidad = $producto['cantidad'];
                $detalle_venta->costo_unitario = $productoEnDb->precio_costo;
                $detalle_venta->precio_unitario = $productoEnDb->precio_venta;
                $detalle_venta->save();

                // Resto cantidad vendida del stock
                $productoEnDb->stock_actual -= $producto['cantidad'];
                $productoEnDb->save();


                $lote = Lote::where('cantidad_restante', '>', 0)
                    ->where('producto_id', $productoEnDb->id)
                    ->orderByRaw('ISNULL(fecha_vencimiento), fecha_vencimiento DESC') // Ordena por fecha de vencimiento
                    ->orderByRaw('IF(fecha_vencimiento IS NULL, 1, 0)') // Prioriza los lotes sin fecha de vencimiento
                    ->orderByDesc('precio_costo') // Prioriza los lotes con precio de costo más alto
                    ->get()
                    ->first();

                if ($lote) {
                    $lote->cantidad_restante -= $producto['cantidad'];
                    $lote->save();
                }
            }

            if ($venta->estado_pago == Venta::PARCIALMENTE_COBRADA) {
                $pago = new Pago;
                $pago->venta_id = $venta->id;
                $pago->fecha_pago = now();
                $pago->monto_pagado = $request->montoAbonado;
                $pago->metodos_de_pago = $request->metodoPago;
                $pago->save();
            }

            DB::commit(); // Confirma la transacción si todo se ejecuta correctamente
            return response()->json(['message' => 'Venta realizada con éxito.'], 200);

        } catch (\Exception $e) {

            DB::rollBack(); // Revierte la transacción si hay una excepción

            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
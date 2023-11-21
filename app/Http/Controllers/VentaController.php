<?php

namespace App\Http\Controllers;

use App\Models\DetalleVenta;
use App\Models\Producto;
use App\Models\ProductosBase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Lote;
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

    public function storeApi(Request $request)
    {
        try {
            $user = Auth::user();
            $status = 2;
            DB::beginTransaction(); // Inicia la transacción
    
            $venta = new Venta;
            $venta->sesion_caja_id = 1;
            $venta->user_id = 1;
            $venta->monto_total_costo = 0;
            $venta->monto_total_venta = 0;
            $venta->fecha_venta = now();
            $venta->save();
    
            $productos = $request->productos;

            $monto_total_venta = 0;
            $monto_total_costo = 0;
    
            foreach ($productos as $producto) {
                $productoDb = Producto::find($producto['id']);
    
                if (!$productoDb) {
                    DB::rollBack(); // Revierte la transacción si un producto no se encuentra
                    throw new \Exception('Producto no encontrado.');
                }
    
                $detalle_venta = new DetalleVenta;
                $detalle_venta->venta_id = $venta->id;
                $detalle_venta->producto_id = $productoDb->id;
                $detalle_venta->nombre_producto = $productoDb->titulo;
                $detalle_venta->cantidad = $producto['cantidad'];
                $detalle_venta->precio_unitario = $productoDb->precio_venta;
                $detalle_venta->costo_unitario = $productoDb->precio_costo;
                $detalle_venta->save();
   
                $monto_total_venta += ($productoDb->precio_venta * $producto['cantidad']);
                $monto_total_costo += ($productoDb->precio_costo * $producto['cantidad']);

                // Validar si hay suficiente stock disponible para realizar la operación.
                if ($productoDb->stock_actual >= $producto['cantidad']) {
                    // Restar la cantidad del producto del stock actual.
                    $productoDb->stock_actual -= $producto['cantidad'];

                    $productoDb->save();
                } else {
                    return response()->json(['status' => 2, 'message' => 'No hay suficiente stock disponible para esta operación.']);
                }

                $lote = Lote::where('cantidad_restante', '>', 0)
                    ->orderByRaw('ISNULL(fecha_vencimiento), fecha_vencimiento DESC') // Ordena por fecha de vencimiento
                    ->orderByRaw('IF(fecha_vencimiento IS NULL, 1, 0)') // Prioriza los lotes sin fecha de vencimiento
                    ->orderByDesc('precio_costo') // Prioriza los lotes con precio de costo más alto
                    ->get()
                    ->first();
                $lote->cantidad_restante -= $producto['cantidad'];
                $lote->save();
            }
    
            $venta->monto_total_costo = $monto_total_costo;
            $venta->monto_total_venta = $monto_total_venta;
            $venta->update();
    
            DB::commit(); // Confirma la transacción si todo se ejecuta correctamente
            $status = 1;
            return response()->json(['status' => $status, 'message' => 'Venta realizada con éxito.']);
        } catch (\Exception $e) {
            DB::rollBack(); // Revierte la transacción si hay una excepción
            $status = 2;
            return response()->json(['status' => $status, 'message' => $e->getMessage()], 500);
        }
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
}
<?php

namespace App\Http\Controllers;

use App\Models\Comercio;
use App\Models\DetalleVenta;
use App\Models\Producto;
use App\Models\SesionCaja;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Lote;
use App\Models\Pago;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PDF;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $fecha = $request->query('fecha') ? Carbon::parse($request->query('fecha')) : Carbon::today();
        return view('ventas.index', compact('fecha'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $venta = Venta::with('detalles')->find($id);
        return view('ventas.show', compact('venta'));
    }


    // FUNCIONES AUXILIARES 
    private function obtenerTotalCostos($productos)
    {
        $total_costo = 0;
        foreach ($productos as $producto) {
            $productoEnDb = Producto::find($producto['id']);
            if ($productoEnDb->tipo == Producto::COSTO_ADICIONAL) {
                $costo = $producto['precio_costo'];
                $total_costo = $total_costo + $costo;
            } else {
                $costo = $productoEnDb->precio_costo * $producto['cantidad'];
                $total_costo = $total_costo + $costo;
            }
        }
        return $total_costo;
    }
    private function obtenerTotalVentas($productos)
    {
        $total_valor_venta = 0;
        foreach ($productos as $producto) {
            $productoEnDb = Producto::find($producto['id']);
            if ($productoEnDb->tipo == Producto::COSTO_ADICIONAL) {
                $valor_venta = $producto['precio_venta'] + $producto['precio_costo'];
                $total_valor_venta = $total_valor_venta + $valor_venta;
            } else {
                $valor_venta = $productoEnDb->precio_venta * $producto['cantidad'];
                $total_valor_venta = $total_valor_venta + $valor_venta;
            }
        }
        return $total_valor_venta;
    }

    public function imprimirEtiqueta(Request $request) {
        
    }



    // API
    public function indexApi(Request $request)
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $cantidadVentas = $user->comercio->ventas->count();


        // Obtener la fecha proporcionada en el request, o usar la fecha de hoy si no se proporciona ninguna fecha
        $fecha = $request->query('fecha') ? Carbon::parse($request->query('fecha')) : Carbon::today();

        // Obtener las ventas del mismo comercio con clientes para la fecha proporcionada
        $ventasConClientes = Venta::where('comercio_id', $id_comercio)
            ->whereDate('fecha_hora_venta', $fecha->toDateString())
            ->whereHas('cliente') // Filtra las ventas que tienen un cliente asociado
            ->with(['cliente', 'sesionCaja.cajero', 'metodoPago'])
            ->get();

        // Obtener las ventas del mismo comercio sin clientes para la fecha proporcionada
        $ventasSinClientes = Venta::where('comercio_id', $id_comercio)
            ->whereDate('fecha_hora_venta', $fecha->toDateString())
            ->whereDoesntHave('cliente') // Filtra las ventas que no tienen un cliente asociado
            ->with(['sesionCaja.cajero', 'metodoPago'])
            ->get();

        // Combinar los resultados en una sola colección
        $ventasCombinadas = $ventasConClientes->merge($ventasSinClientes);

        $ventasOrdenadas = $ventasCombinadas->sortByDesc(function ($venta) {
            return $venta->created_at; // Suponiendo que la fecha de creación sea relevante para ordenar
        })->values(); // Utiliza values() para obtener un array de objetos

        // Verificar si hay una sesión de caja abierta para el usuario logueado, la fecha seleccionada y el comercio_id específico

        $sesionCaja = SesionCaja::where('user_id', $user->id)
            ->where('fecha_hora_apertura', '<=', $fecha)
            ->where('fecha_hora_cierre', '>=', $fecha)
            ->where('comercio_id', $id_comercio)
            ->where(function ($query) use ($fecha) {
                $query->whereNull('fecha_hora_cierre')
                    ->orWhere('fecha_hora_cierre', '>=', $fecha);
            })
            ->with('cajero')
            ->first();


        $respuesta = [
            'sesionCaja' => $sesionCaja,
            'ventas' => $ventasOrdenadas,
            'cantidadVentas' => $cantidadVentas
        ];

        // Devolver la respuesta como JSON
        return response()->json($respuesta);
    }

    public function indexSesionApi(Request $request, string $sesionCajaId)
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;

        // Obtener la fecha proporcionada en el request, o usar la fecha de hoy si no se proporciona ninguna fecha
        $fecha = $request->query('fecha') ? Carbon::parse($request->query('fecha')) : Carbon::today();

        // Obtener las ventas del mismo comercio con clientes para la fecha proporcionada
        $ventasConClientes = Venta::where('comercio_id', $id_comercio)
            ->whereDate('fecha_hora_venta', $fecha->toDateString())
            ->whereHas('cliente') // Filtra las ventas que tienen un cliente asociado
            ->where('sesion_caja_id', $sesionCajaId)
            ->with(['cliente', 'sesionCaja.cajero', 'metodoPago'])
            ->get();

        // Obtener las ventas del mismo comercio sin clientes para la fecha proporcionada
        $ventasSinClientes = Venta::where('comercio_id', $id_comercio)
            ->whereDate('fecha_hora_venta', $fecha->toDateString())
            ->whereDoesntHave('cliente') // Filtra las ventas que no tienen un cliente asociado
            ->where('sesion_caja_id', $sesionCajaId)
            ->with(['sesionCaja.cajero', 'metodoPago'])
            ->get();

        // Combinar los resultados en una sola colección
        $ventasCombinadas = $ventasConClientes->merge($ventasSinClientes);

        $ventasOrdenadas = $ventasCombinadas->sortByDesc(function ($venta) {
            return $venta->created_at; // Suponiendo que la fecha de creación sea relevante para ordenar
        })->values(); // Utiliza values() para obtener un array de objetos

        // Verificar si hay una sesión de caja abierta para el usuario logueado, la fecha seleccionada y el comercio_id específico


        $respuesta = [
            'ventas' => $ventasOrdenadas,
        ];

        // Devolver la respuesta como JSON
        return response()->json($respuesta);
    }

    public function storeApi(Request $request)
    {
        $user = Auth::user();
        $dataProductos = json_encode($request->productos);
        $dataUsuario = json_encode($user);

        $dataCliente = json_encode($request['cliente']);
        $dataMetodo = json_encode($request['metodoPago']);
        $dataEstadoPago = json_encode($request['estadoPago']);
        $dataAumento = json_encode($request['aumento']);
        $dataDescuento = json_encode($request['descuento']);
        // Crear un array asociativo con las variables codificadas en JSON
        $data = [
            'cliente' => $dataCliente,
            'metodoPago' => $dataMetodo,
            'estadoPago' => $dataEstadoPago,
            'aumento' => $dataAumento,
            'descuento' => $dataDescuento,
        ];

        // Codificar el array como un objeto JSON
        $dataRequest = json_encode($data);


        try {
            
            // Obtén la última sesión de caja abierta del usuario
            $ultimaSesionCaja = $user->ultimaSesionCajaAbierta()->first();

            // Si $ultimaSesionCaja es null, se ejecuta el bloque else, de lo contrario, simplemente no se hace nada
            if (!$ultimaSesionCaja) {
                $logMessageProdNofound = "[" . now()->toDateTimeString() . "] Ultima sesión no encontrada: Datos de la venta Productos: $dataProductos. Datos del usuario: $dataUsuario, datos del request: $dataRequest";
                Storage::disk('local')->append('fallos_en_venta.log', $logMessageProdNofound);

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

            $venta->aumento = $request['aumento'];
            $venta->descuento = $request['descuento'];
            $venta->tipo_aumento = $request['tipo_aumento'];
            $venta->tipo_descuento = $request['tipo_descuento'];

            $venta->save();

            // 2 CREO DETALLE DE VENTAS
            foreach ($request->productos as $producto) {
                $productoEnDb = Producto::find($producto['id']);
                if (!$productoEnDb) {

                    $logMessageProdNofound = "[" . now()->toDateTimeString() . "] Producto No Encontrado: " . $producto['id'] . ". Datos de la venta Productos: $dataProductos. Datos del usuario: $dataUsuario, datos del request: $dataRequest";
                    Storage::disk('local')->append('fallos_en_venta.log', $logMessageProdNofound);

                    DB::rollBack(); // Revierte la transacción si un producto no se encuentra
                    throw new \Exception('Producto no encontrado: ' . $producto['id']);
                }

                $detalle_venta = new DetalleVenta;
                $detalle_venta->venta_id = $venta->id;
                $detalle_venta->producto_id = $productoEnDb->id;
                $detalle_venta->nombre_producto = $productoEnDb->titulo;
                $detalle_venta->cantidad = $producto['cantidad'];
                $detalle_venta->costo_unitario = $productoEnDb->tipo == Producto::COSTO_ADICIONAL ? $producto['precio_costo'] : $productoEnDb->precio_costo;
                $detalle_venta->precio_unitario = $productoEnDb->tipo == Producto::COSTO_ADICIONAL ? $producto['precio_venta'] + $producto['precio_costo'] : $productoEnDb->precio_venta;
                $detalle_venta->tipo = $productoEnDb->tipo;
                $detalle_venta->save();

                // Resto cantidad vendida del stock
                $productoEnDb->stock_actual -= $producto['cantidad'];
                $productoEnDb->save();
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
            return response()->json(['message' => 'Venta realizada con éxito.', 'id_ultima_venta' => $venta->id], 200);

        } catch (\Exception $e) {

            // Guarda el intento de ingreso en un archivo de registro
            $mensaje = $e->getMessage();
            $logMessage = "[" . now()->toDateTimeString() . "] Intento de guardar una venta. Msj: " . $mensaje . ". Datos de la venta Productos: $dataProductos. Datos del usuario: $dataUsuario, datos del request: $dataRequest";
            Storage::disk('local')->append('fallos_en_venta.log', $logMessage);

            DB::rollBack(); // Revierte la transacción si hay una excepción
            return response()->json(['message' => $e->getMessage()], 500);


        }
    }

    public function showApi(string $id)
    {
        $venta = Venta::with('detalles')->find($id);
        $comercio = $venta->user->comercio;
        $respuesta = [
            'venta' => $venta,
            'comercio' => $comercio
        ];

        return response()->json($respuesta);
    }

    public function anularVentaApi(Request $request)
    {
        $venta = Venta::find($request->id);
        $user = Auth::user();
        if ($user->comercio_id === $venta->comercio_id) {
            $venta->anulada = true;
            return $venta->update();
        }
        return response()->json(['error' => 'Error al procesar los datos'], 400);
    }

    public function ultimaVentaApi()
    {
        $user = Auth::user();

        // Obtén la última sesión de caja abierta del usuario
        $sesionCaja = $user->ultimaSesionCajaAbierta()->first();

        // Si $sesionCaja es null, se ejecuta el bloque else, de lo contrario, simplemente no se hace nada
        if (!$sesionCaja) {
            $logMessageProdNofound = "[" . now()->toDateTimeString() . "] Ultima sesión no encontrada. Vista Lector. Error en la busqueda de la sesión para traer la ultima venta.";
            Storage::disk('local')->append('fallos_en_lector.log', $logMessageProdNofound);
            return response()->json(['error' => 'No se encontró una sesión de caja abierta para este usuario.'], 404);
        }
        // Obtener la última venta asociada a la sesión de caja
        $ultimaVenta = $sesionCaja->ventas()->latest('created_at')->first();

        // Verificar si se encontró alguna venta
        if ($ultimaVenta) {
            // Hacer algo con $ultimaVenta
            return response()->json(['id_ultima_venta' => $ultimaVenta->id]);
        } else {
            // Manejar la situación donde no se encontró ninguna venta
            return response()->json(['mensaje' => 'No se encontró ninguna venta para esta sesión de caja'], 404);
        }

    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\CajaMovimiento;
use App\Models\SesionCaja;

class CajaMovimientoController extends Controller
{
    public function createIngreso()
    {
        $user = Auth::user();
        $ultimaSesion = $user->sesionesCaja()->latest()->first();

        // Calcular el total de ventas para la sesión de caja del usuario
        $ventas = Venta::where('sesion_caja_id', $ultimaSesion->id)->sum('monto_total_venta');

        // Obtener los movimientos de caja (adicion) para la sesión de caja del usuario
        $movimientosAdicion = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'adicion')
            ->sum('monto');

        // Obtener los movimientos de caja (retiro) para la sesión de caja del usuario
        $movimientosRetiro = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'retiro')
            ->sum('monto');

        // Calcular el total (monto inicial + total de ventas + movimientos de adicion - movimientos de resta)
        $total = $ultimaSesion->monto_inicial + $ventas + $movimientosAdicion - $movimientosRetiro;

        $ultimosIngresos = CajaMovimiento::where('tipo', 'adicion')
            ->where('sesion_caja_id', $ultimaSesion->id)
            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
            ->take(10)
            ->get();


        return view('cajas.ingreso.create', compact('ultimaSesion', 'ultimosIngresos', 'total'));

    }

    public function createEgreso()
    {
        $user = Auth::user();
        $ultimaSesion = $user->sesionesCaja()->latest()->first();

        // Calcular el total de ventas para la sesión de caja del usuario
        $ventas = Venta::where('sesion_caja_id', $ultimaSesion->id)->sum('monto_total_venta');

        // Obtener los movimientos de caja (adicion) para la sesión de caja del usuario
        $movimientosAdicion = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'adicion')
            ->sum('monto');

        // Obtener los movimientos de caja (retiro) para la sesión de caja del usuario
        $movimientosRetiro = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'retiro')
            ->sum('monto');

        // Calcular el total (monto inicial + total de ventas + movimientos de adicion - movimientos de resta)
        $total = $ultimaSesion->monto_inicial + $ventas + $movimientosAdicion - $movimientosRetiro;


        $ultimosEgresos = CajaMovimiento::where('tipo', 'retiro')
            ->where('sesion_caja_id', $ultimaSesion->id)
            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
            ->take(10)
            ->get();

        return view('cajas.egreso.create', compact('ultimaSesion', 'ultimosEgresos', 'total'));
    }

    public function agregarDinero(Request $request, $sesionCajaId)
    {
        $user = Auth::user();
        $comercio_id = $user->comercio_id;
        $sesion = SesionCaja::find($sesionCajaId);

        if ($comercio_id == $sesion->comercio_id) {

            $monto = $request->input('monto');
            $descripcion = $request->input('descripcion');

            DB::transaction(function () use ($monto, $sesionCajaId, $descripcion) {
                // Registrar el movimiento
                CajaMovimiento::create([
                    'sesion_caja_id' => $sesionCajaId,
                    'user_id' => Auth::id(),
                    'tipo' => 'adicion',
                    'monto' => $monto,
                    'descripcion' => $descripcion
                ]);

                // Actualizar monto actual en sesiones_cajas
                $sesionCaja = SesionCaja::find($sesionCajaId);
                $sesionCaja->save();
            });
        }
        return redirect()->back();
    }


    public function retirarDinero(Request $request, $sesionCajaId)
    {
        $user = Auth::user();
        $comercio_id = $user->comercio_id;
        $sesion = SesionCaja::find($sesionCajaId);

        if ($comercio_id == $sesion->comercio_id) {

            $monto = $request->input('monto');
            $descripcion = $request->input('descripcion');

            DB::transaction(function () use ($monto, $sesionCajaId, $descripcion) {
                // Registrar el movimiento
                CajaMovimiento::create([
                    'sesion_caja_id' => $sesionCajaId,
                    'user_id' => Auth::id(),
                    'tipo' => 'retiro',
                    'monto' => $monto,
                    'descripcion' => $descripcion,
                ]);

                // Actualizar monto actual en sesiones_cajas
                $sesionCaja = SesionCaja::find($sesionCajaId);
                $sesionCaja->save();
            });
        }
        return redirect()->back();
    }


    // API
    public function createEgresoApi()
    {
        $user = Auth::user();
        $ultimaSesion = $user->sesionesCaja()->with('cajero')->latest()->first();

        // Calcular el total de ventas para la sesión de caja del usuario
        $ventas = Venta::where('sesion_caja_id', $ultimaSesion->id)->sum('monto_total_venta');

        // Obtener los movimientos de caja (adicion) para la sesión de caja del usuario
        $movimientosAdicion = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'adicion')
            ->sum('monto');

        // Obtener los movimientos de caja (retiro) para la sesión de caja del usuario
        $movimientosRetiro = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'retiro')
            ->sum('monto');

        // Calcular el total (monto inicial + total de ventas + movimientos de adicion - movimientos de resta)
        $total = $ultimaSesion->monto_inicial + $ventas + $movimientosAdicion - $movimientosRetiro;


        $ultimosEgresos = CajaMovimiento::where('tipo', 'retiro')
            ->where('sesion_caja_id', $ultimaSesion->id)
            ->with('user')
            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
            ->take(10)
            ->get();

        $respuesta = [
            'total' => $total,
            'ultimaSesion' => $ultimaSesion,
            'ultimosEgresos' => $ultimosEgresos
        ];

        // Devolver la respuesta como JSON
        return response()->json($respuesta);
    }

    public function storeEgresoApi(Request $request)
    {
        try {
            $user = Auth::user();
            $comercio_id = $user->comercio_id;
            $sesion = $user->sesionesCaja()->latest()->first();
            $sesionCajaId = $sesion->id;
    
            if ($comercio_id == $sesion->comercio_id) {
    
                $monto = $request->input('monto');
                $descripcion = $request->input('descripcion');
    
                DB::transaction(function () use ($monto, $sesionCajaId, $descripcion) {
                    // Registrar el movimiento
                    CajaMovimiento::create([
                        'sesion_caja_id' => $sesionCajaId,
                        'user_id' => Auth::id(),
                        'tipo' => 'retiro',
                        'monto' => $monto,
                        'descripcion' => $descripcion,
                    ]);
    
                    // Actualizar monto actual en sesiones_cajas
                    $sesionCaja = SesionCaja::find($sesionCajaId);
                    $sesionCaja->save();
                });
            }        
            return response()->json(['message' => 'Proceso realizado con éxito.'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    
    public function verEfectivoEnCaja($sesionCajaId) 
    {
        $user = Auth::user();
        $comercio_id = $user->comercio_id;
        $sesion = SesionCaja::find($sesionCajaId);

        
        return $sesion->efectivoDisponibleEnCaja();
    }

}
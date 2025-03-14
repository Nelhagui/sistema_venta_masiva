<?php

namespace App\Http\Controllers;

use App\Models\CajaMovimiento;
use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\SesionCaja;
use App\Models\PagoInversion;

class SesionCajaController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $sesiones = $user->sesionesCaja()->with('ventas')->latest()->paginate(15);
        return view('cajas.index', compact('sesiones'));
    }

    public function show()
    {
        $user = Auth::user();
        $ultimaSesion = $user->sesionesCaja()->with('ventas')->latest()->first();

        // Calcular el total de ventas para la sesión de caja del usuario
        $ventas = Venta::where('sesion_caja_id', $ultimaSesion->id)->where('estado_pago', 'cobrada')->sum('monto_total_venta');

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
        // dd($ventas);

        return view('cajas.show', compact('ultimaSesion', 'total'));
        // return view('proximamente.index');
    }
    public function showDetalle(SesionCaja $sesionCaja)
    {
        $user = Auth::user();
        if ($user->comercio_id == $sesionCaja->comercio_id)
            return view('cajas.showDetalle', compact('sesionCaja'));
        else
            return back();
    }

    public function createApertura()
    {
        return view('cajas.apertura.index');
    }
    public function storeApertura(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'monto' => 'required'
        ]);
        $montoInicial = $request->input('monto');
        $sesionCaja = new SesionCaja;

        $sesionCaja->user_id = $user->id;
        $sesionCaja->comercio_id = $user->comercio_id;
        $sesionCaja->fecha_hora_apertura = now();
        $sesionCaja->monto_inicial = $montoInicial;
        $sesionCaja->save();

        return redirect()->route('index.lector');
    }
    public function storeCierre()
    {
        $usuarioId = Auth::id(); // Obtener el ID del usuario autenticado

        // Obtener la última sesión de caja sin cerrar del usuario actual
        $ultimaSesion = SesionCaja::where('user_id', $usuarioId)
            ->whereNull('fecha_hora_cierre')
            ->latest('fecha_hora_apertura')
            ->first();

        if ($ultimaSesion) {
            // Si se encuentra la última sesión de caja sin cerrar, puedes manejarlo aquí
            $ultimaSesion->fecha_hora_cierre = now();
            $ultimaSesion->update();
            return redirect()->route('create.aperturaCaja');
        } else {
            // Si no se encuentra una sesión de caja abierta, puedes redirigir a una página o realizar alguna acción apropiada
            return redirect()->route('create.aperturaCaja'); // Por ejemplo, redirigir a la página para crear una nueva sesión de caja
        }
    }

    //  API
    
    public function showApi(Request $request)
    {
        $user = Auth::user();
        
        $ultimaSesion = $user->sesionesCaja()->with(['ventas' => function($query) {
            $query->where('estado_pago', 'cobrada');
        }])->latest()->first();

        // Calcular el total de ventas para la sesión de caja del usuario
        $ventas = Venta::where('sesion_caja_id', $ultimaSesion->id)->where('estado_pago', 'cobrada')->sum('monto_total_venta');
        
        $aumentos = Venta::where('sesion_caja_id', $ultimaSesion->id)->sum('aumento');
        $descuentos = Venta::where('sesion_caja_id', $ultimaSesion->id)->sum('descuento');

        // Obtener los movimientos de caja (adicion) para la sesión de caja del usuario
        $movimientosAdicion = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'adicion')
            ->sum('monto');

        // Obtener los movimientos de caja (retiro) para la sesión de caja del usuario
        $movimientosRetiro = CajaMovimiento::where('sesion_caja_id', $ultimaSesion->id)
            ->where('tipo', 'retiro')
            ->sum('monto');

        $pagoInversores = PagoInversion::where('sesion_caja_id', $ultimaSesion->id)
            ->sum('monto_abonado');


        // Calcular el total (monto inicial + total de ventas + movimientos de adicion - movimientos de resta)
        $total = $ultimaSesion->monto_inicial + $ventas + $movimientosAdicion - $movimientosRetiro + $aumentos - $descuentos - $pagoInversores;

        $respuesta = [
            'ultimaSesion' => $ultimaSesion,
            'total' => $total,
            'movimientosAdicion' => $movimientosAdicion,
            'movimientosRetiro' => $movimientosRetiro,
            'pagoInversores' => $pagoInversores
        ];

        // Devolver la respuesta como JSON
        return response()->json($respuesta);    
    }

    public function storeCierreApi()
    {
        $usuarioId = Auth::id(); // Obtener el ID del usuario autenticado

        // Obtener la última sesión de caja sin cerrar del usuario actual
        $ultimaSesion = SesionCaja::where('user_id', $usuarioId)
            ->whereNull('fecha_hora_cierre')
            ->latest('fecha_hora_apertura')
            ->first();

        if ($ultimaSesion) {
            // Si se encuentra la última sesión de caja sin cerrar, puedes manejarlo aquí
            $ultimaSesion->fecha_hora_cierre = now();
            $ultimaSesion->update();
            return $ultimaSesion->update();
        } else {
            // Si no se encuentra una sesión de caja abierta, puedes redirigir a una página o realizar alguna acción apropiada
        }
    }
}
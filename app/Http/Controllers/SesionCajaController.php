<?php

namespace App\Http\Controllers;

use App\Models\CajaMovimiento;
use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\SesionCaja;

class SesionCajaController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $sesiones = $user->sesionesCaja()->latest()->paginate(15);
        return view('cajas.index', compact('sesiones'));
    }

    public function show()
    {
        $user = Auth::user();
        $ultimaSesion = $user->sesionesCaja()->with('ventas')->latest()->first();

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
}
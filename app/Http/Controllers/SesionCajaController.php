<?php

namespace App\Http\Controllers;

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
        $ultimaSesion = $user->sesionesCaja()->latest()->first();
        return view('cajas.show', compact('ultimaSesion'));
        // return view('proximamente.index');
    }
    public function showDetalle(SesionCaja $sesionCaja)
    {
        $user = Auth::user();
        if($user->comercio_id == $sesionCaja->comercio_id)
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
        $sesionCaja->monto_actual = $montoInicial;
        $sesionCaja->save();

        return redirect()->route('index.lector');
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\SesionCaja;

class SesionCajaController extends Controller
{
    public function index()
    {
        $sesiones = SesionCaja::orderBy('created_at', 'desc')->paginate(15);
        return view('cajas.index', compact('sesiones'));
    }

    public function show()
    {
        $ultimaSesion = SesionCaja::latest()->first();
        return view('cajas.show', compact('ultimaSesion'));
    }
    public function showDetalle(SesionCaja $sesionCaja)
    {
        return view('cajas.showDetalle', compact('sesionCaja'));
    }
    
    public function createApertura()
    {
        return view('cajas.apertura.index');
    }
    public function storeApertura(Request $request)
    {
        $request->validate([
            'monto' => 'required'
        ]);
        $montoInicial = $request->input('monto');
        $sesionCaja = new SesionCaja;

        $sesionCaja->user_id = Auth::id();
        $sesionCaja->fecha_hora_apertura = now();
        $sesionCaja->monto_inicial = $montoInicial;
        $sesionCaja->monto_actual = $montoInicial;
        $sesionCaja->save();

        return redirect()->route('index.lector');
    }
}
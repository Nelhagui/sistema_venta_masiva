<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\CajaMovimiento;
use App\Models\SesionCaja;

class CajaMovimientoController extends Controller
{
    public function createIngreso()
    {
        $ultimaSesion = SesionCaja::latest()->first();
        $ultimosIngresos = CajaMovimiento::where('tipo', 'adición')
                            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
                            ->take(10)
                            ->get();

        return view('cajas.ingreso.create', compact('ultimaSesion', 'ultimosIngresos'));
    }

    public function createEgreso()
    {
        $ultimaSesion = SesionCaja::latest()->first();
        $ultimosEgresos = CajaMovimiento::where('tipo', 'retiro')
                            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
                            ->take(10)
                            ->get();
        return view('cajas.egreso.create', compact('ultimaSesion', 'ultimosEgresos'));
    }
    
    public function agregarDinero(Request $request, $sesionCajaId)
    {
        $monto = $request->input('monto');
        $descripcion = $request->input('descripcion');

        DB::transaction(function () use ($monto, $sesionCajaId, $descripcion) {
            // Registrar el movimiento
            CajaMovimiento::create([
                'sesion_caja_id' => $sesionCajaId,
                'user_id' => Auth::id(),
                'tipo' => 'adición',
                'monto' => $monto,
                'descripcion' => $descripcion
            ]);

            // Actualizar monto actual en sesiones_cajas
            $sesionCaja = SesionCaja::find($sesionCajaId);
            $sesionCaja->monto_actual += $monto;
            $sesionCaja->save();
        });
        return redirect()->back();
    }

    public function retirarDinero(Request $request, $sesionCajaId)
    {
        $monto = $request->input('monto');
        $descripcion = $request->input('descripcion');

        DB::transaction(function () use ($monto, $sesionCajaId, $descripcion) {
            // Registrar el movimiento
            CajaMovimiento::create([
                'sesion_caja_id' => $sesionCajaId,
                'user_id' => Auth::id(),
                'tipo' => 'retiro',
                'monto' => -$monto,
                'descripcion' => $descripcion,
            ]);

            // Actualizar monto actual en sesiones_cajas
            $sesionCaja = SesionCaja::find($sesionCajaId);
            $sesionCaja->monto_actual -= $monto; // Aquí estamos restando el monto
            $sesionCaja->save();
        });

        return redirect()->back();
    }


}
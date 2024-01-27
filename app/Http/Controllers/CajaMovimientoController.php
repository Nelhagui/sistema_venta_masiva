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
        $user = Auth::user();
        $comercio = $user->comercio;
        $idsSessionesDelComercio = $comercio->sesionesCaja->pluck('id')->toArray();
        $ultimaSesion = $user->sesionesCaja()->latest()->first();
        $ultimosIngresos = CajaMovimiento::where('tipo', 'adición')
            ->whereIn('sesion_caja_id', $idsSessionesDelComercio)
            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
            ->take(10)
            ->get();

        return view('cajas.ingreso.create', compact('ultimaSesion', 'ultimosIngresos'));
    }

    public function createEgreso()
    {
        $user = Auth::user();
        $comercio = $user->comercio;
        $idsSessionesDelComercio = $comercio->sesionesCaja->pluck('id')->toArray();
        $ultimaSesion = $user->sesionesCaja()->latest()->first();
        $ultimosEgresos = CajaMovimiento::where('tipo', 'retiro')
            ->whereIn('sesion_caja_id', $idsSessionesDelComercio)
            ->latest()  // Esto ordenará por la columna 'created_at' de forma descendente
            ->take(10)
            ->get();
        return view('cajas.egreso.create', compact('ultimaSesion', 'ultimosEgresos'));
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
                    'tipo' => 'adición',
                    'monto' => $monto,
                    'descripcion' => $descripcion
                ]);

                // Actualizar monto actual en sesiones_cajas
                $sesionCaja = SesionCaja::find($sesionCajaId);
                $sesionCaja->monto_actual += $monto;
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
                    'monto' => -$monto,
                    'descripcion' => $descripcion,
                ]);

                // Actualizar monto actual en sesiones_cajas
                $sesionCaja = SesionCaja::find($sesionCajaId);
                $sesionCaja->monto_actual -= $monto; // Aquí estamos restando el monto
                $sesionCaja->save();
            });
        }
        return redirect()->back();
    }


}
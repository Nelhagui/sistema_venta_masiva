<?php

namespace App\Http\Controllers;

use App\Models\Inversion;
use App\Models\PagoInversion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PagoInversionController extends Controller
{
    public function storeApi(Request $request)
    {
        $user = Auth::user();
        $inversion = Inversion::find($request->inversion_id);
        if (!$inversion) {
            return response()->json(['error' => 'La inversión no existe'], 404);
        }
        if ($user->comercio_id == $inversion->comercio_id) {
            $pagoInversion = new PagoInversion;
            $pagoInversion->fecha_pago = $request->fecha_pago;
            $pagoInversion->monto_abonado = $request->monto_abonado;
            $pagoInversion->nota = $request->nota;

            $pagoInversion->inversion_id = $inversion->id;
            $pagoInversion->usuario_carga_id = $user->id;

            $pagoInversion->save();

            // Calcular el total de los pagos asociados a la inversión
            $totalPagos = PagoInversion::where('inversion_id', $inversion->id)->sum('monto_abonado');

            // Verificar si el total de los pagos cubre el monto invertido
            if ($totalPagos >= $inversion->monto_invertido) {
                // Cambiar el estado de la inversión
                $inversion->estado_devolucion = 'pago';
                $inversion->save();
            }

        } else {
            return response()->json(['error' => 'La inversion no existe'], 404);
        }
    }
}

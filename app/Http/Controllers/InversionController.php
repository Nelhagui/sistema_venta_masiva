<?php

namespace App\Http\Controllers;

use App\Models\Inversion;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class InversionController extends Controller
{
    public function show()
    {
        return view('inversiones.show');
    }
    public function storeApi(Request $request)
    {
        $user = Auth::user();
        $inversion = new Inversion;
        $inversion->fecha_inversion = $request->fecha_inversion;
        $inversion->monto_invertido = $request->monto_invertido;
        $inversion->porcentaje_ganancia = $request->porcentaje_ganancia;
        $inversion->nota = $request->nota;
        $inversion->comercio_id = $user->comercio_id;
        $inversion->inversor_id = $request->inversor_id;

        return $inversion->save();
    }

    public function showApi(Request $request)
    {
        $user = Auth::user();

        $inversion = Inversion::where('id', $request->id)
            ->where('comercio_id', $user->comercio_id)
            ->with('pagos')
            ->first();

        // Verificar si la inversión no existe
        if (!$inversion) {
            return response()->json(['error' => 'La inversión no existe o no tienes permiso para acceder a ella'], 404);
        }
        return $inversion;
    }
}

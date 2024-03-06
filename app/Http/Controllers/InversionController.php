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
}

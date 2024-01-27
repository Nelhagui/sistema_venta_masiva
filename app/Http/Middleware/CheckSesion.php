<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SesionCaja;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckSesion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $ultimaSesion = $user->sesionesCaja()->latest()->first();
        $esApertura = $request->routeIs('create.aperturaCaja'); // Verifica si la ruta actual es "cajas.apertura.index"
        
        if(!$ultimaSesion || ($ultimaSesion && $ultimaSesion->fecha_hora_cierre !== null)) {
            // Si no hay una sesión previa o las condiciones de la sesión previa se cumplen
            if ($esApertura) {
                // dd('1');
                return $next($request);
            }
            // dd('2');
            return redirect()->route('create.aperturaCaja');
        }
        
        // Si es la ruta de apertura y las condiciones no se cumplen, redirige al inicio o a donde desees
        if ($esApertura) {
            // dd('3');
            return redirect()->route('show.cajas');
        }

        // dd('4');
        return $next($request);
    }
}
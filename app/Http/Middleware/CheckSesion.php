<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SesionCaja;
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
        $ultimaSesion = SesionCaja::orderBy('created_at', 'desc')->first();
        $esApertura = $request->routeIs('create.aperturaCaja'); // Verifica si la ruta actual es "cajas.apertura.index"
        if ($ultimaSesion && $ultimaSesion->fecha_hora_cierre && !SesionCaja::whereNull('fecha_hora_cierre')->exists()) {
            // Si es la ruta de apertura y las condiciones se cumplen, permite el acceso
            if ($esApertura) {
                return $next($request);
            }
            // Si no es la ruta de apertura y las condiciones se cumplen, redirige al usuario
            return redirect()->route('create.aperturaCaja');
        }

        // Si es la ruta de apertura y las condiciones no se cumplen, redirige al inicio o a donde desees
        if ($esApertura) {
            return redirect()->route('show.cajas');
        }

        return $next($request);
    }
}
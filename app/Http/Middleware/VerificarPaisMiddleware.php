<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class VerificarPaisMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Obtiene la dirección IP del cliente
        $ip = $request->ip();

        // Consulta la API de geolocalización
        $response = Http::get("http://ip-api.com/json/{$ip}");

        // Analiza la respuesta JSON
        $data = $response->json();

        // Obtiene el país desde los datos de la API
        $country = $data['country'];

        // Restringe el acceso basado en el país
        if ($country !== 'Argentina') {
            $url = $request->url();
            // Guarda el intento de ingreso en un archivo de registro
            $logMessage = "[" . now()->toDateTimeString() . "] Intento de ingreso desde $country con la dirección IP: $ip. Ruta: $url";
            Storage::disk('local')->append('intentos_ingreso.log', $logMessage);

            // Redirige al usuario a una página de error o muestra un mensaje de prohibición
            return response("Por el momento no estamos operando en tu país. Disculpas", 403);
        }

        // Si el país está permitido, permite el acceso a la ruta
        return $next($request);
    }
}

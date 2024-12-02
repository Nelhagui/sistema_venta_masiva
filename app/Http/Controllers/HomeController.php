<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $verificarPais = env('VERIFICAR_PAIS', false);

        // if ($verificarPais) {
        //     // Obtiene la dirección IP del cliente
        //     $ip = $request->ip();
    
        //     // Consulta la API de geolocalización
        //     $response = Http::get("http://ip-api.com/json/{$ip}");
    
        //     // Analiza la respuesta JSON
        //     $data = $response->json();
    
        //     // Obtiene el país desde los datos de la API
        //     $country = $data['country'];
    
        //     // Restringe el acceso basado en el país
        //     if ($country !== 'Argentina') {
        //         $url = $request->url();
        //         $logMessage = "[" . now()->toDateTimeString() . "] Intento de ingreso desde $country con la dirección IP: $ip. Ruta: $url";
    
        //         Storage::disk('local')->append('intentos_ingreso.log', $logMessage);
                
        //         // Redirige al usuario a una página de error o muestra un mensaje de prohibición
        //         return "Por el momento no estamos operando en tu país. Disculpas";
        //     }
        // }
        if (Auth::check()) {
            // Si el usuario está autenticado, redirige a otra vista
            return redirect()->route('index.lector');
        }

        // Si el país está permitido, muestra la página normalmente
        return view('welcome');
    }
}

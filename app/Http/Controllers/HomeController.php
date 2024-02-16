<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Obtiene la dirección IP del cliente
        $ip = $request->ip();

        // Consulta la API de geolocalización
        $response = Http::get("http://ip-api.com/json/{$ip}");

        // Analiza la respuesta JSON
        $data = $response->json();

        dd($data);
        // Obtiene el país desde los datos de la API
        $country = $data['country'];

        // Restringe el acceso basado en el país
        if ($country !== 'TuPaisPermitido') {
            // Redirige al usuario a una página de error o muestra un mensaje de prohibición
            return redirect()->route('errorPage');
        }

        // Si el país está permitido, muestra la página normalmente
        return view('home');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\ProductosBase;
use Illuminate\Http\Request;

class ProductosBaseController extends Controller
{
    public function busqueda(Request $request)
    {
        // Validar que el campo 'codigos_barras' esté presente y sea un array
        $request->validate([
            'codigos_barras' => 'required|array',
        ]);

        // Obtener los códigos de barras del cuerpo de la solicitud
        $codigosBarras = $request->input('codigos_barras');

        // Buscar productos relacionados con los códigos de barras proporcionados
        $productos = ProductosBase::whereIn('codigo_barra', $codigosBarras)->get();

        // Devolver los productos encontrados como respuesta
        return response()->json($productos);
    }
}

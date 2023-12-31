<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Producto;

class ReporteController extends Controller
{
    public function index()
    {
        $producto = Producto::find(267);
        $lotes = $producto->lotes;

        return view('reportes.index', compact('producto', 'lotes'));
    }
}

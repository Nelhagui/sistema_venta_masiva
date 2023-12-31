<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Producto;

class ReporteController extends Controller
{
    public function index()
    {
        $compras = Compra::all();

        return view('reportes.index', compact('compras'));
    }
}

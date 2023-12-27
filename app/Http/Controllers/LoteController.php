<?php

namespace App\Http\Controllers;

use App\Models\Lote;
use Illuminate\Http\Request;
use App\Models\Producto;


class LoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lotes = Lote::all();
        $productos = [];
        foreach($lotes as $lote) {
            $producto = Producto::find($lote->producto_id);

            if ($producto) {
                $productos[] = $producto;
            }
        }
        $productos = array_unique($productos);

        return view('lotes.index', compact('lotes', 'productos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        $lotes = Lote::where('producto_id', $producto->id)->get();
        return view('lotes.show', compact('lotes'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lote $lote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lote $lote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lote $lote)
    {
        //
    }
}

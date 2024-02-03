<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use App\Http\Requests\StoreMetodoPagoRequest;
use App\Http\Requests\UpdateMetodoPagoRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Comercio;

class MetodoPagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $metodosDePago = MetodoPago::all();
        return $metodosDePago;
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
    public function store(StoreMetodoPagoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MetodoPago $metodoPago)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MetodoPago $metodoPago)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMetodoPagoRequest $request, MetodoPago $metodoPago)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MetodoPago $metodoPago)
    {
        //
    }

    //API
    public function indexApi()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;

        // Obtener los métodos de pago asociados al comercio
        $metodosDePago = Comercio::find($id_comercio)->metodosDePago;

        // Agregar un método de pago genérico adicional
        $metodoPagoGenerico = [
            'id' => 0, // Puedes usar cualquier identificador único que desees
            'nombre' => 'Efectivo',
        ];

        // Agregar el método de pago genérico a la lista de métodos de pago
        $metodosDePago[] = $metodoPagoGenerico;

        return $metodosDePago;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Inversor;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInversorRequest;
use App\Http\Requests\UpdateInversorRequest;

class InversorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inversores = Inversor::all();
        return view('index.inversores', compact ('inversores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('create.inversores');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inversor = new Inversor;
        $inversor->nombre = $request->nombre;
        $inversor->telefono = $request->telefono;
        $inversor->save();
        return redirect()->route('index.clientes');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inversor $inversor)
    {
        $inversor = Inversor::where('id', $inversor->id);
        return view('show.inversores');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inversor $inversor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Inversor $inversor, Request $request)
    {
        $cliente = Cliente::find($id);
        $cliente->nombre = $request->nombre;
        $cliente->telefono = $request->telefono;
        $cliente->whatsapp = $request->whatsapp;
        $cliente->nota = $request->nota;
        $cliente->update();
        return redirect()->route('index.inversores');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inversor $inversor)
    {
        //
    }
}

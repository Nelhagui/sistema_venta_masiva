<?php

namespace App\Http\Controllers;

use App\Models\Inversor;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInversorRequest;
use App\Http\Requests\UpdateInversorRequest;
use Illuminate\Http\Request;

class InversorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inversores = Inversor::all();
        return view('inversores.index', compact ('inversores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('inversores.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inversor = new Inversor;
        $inversor->nombre = $request->nombre;
        $inversor->apellido = $request->apellido;
        $inversor->save();
        return redirect()->route('index.inversores');
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
        return view('inversores.edit', compact('inversor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Inversor $inversor, Request $request)
    {
        $inversor->nombre = $request->nombre;
        $inversor->apellido = $request->apellido;
        $inversor->estado = $request->estado == "on" ? 1 : 0;
        $inversor->update();
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

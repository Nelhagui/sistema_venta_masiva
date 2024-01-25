<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Comercio;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $clientes = Comercio::find($id_comercio)->clientes;
        return view('clientes.index', compact('clientes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('clientes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cliente = new Cliente;
        $cliente->nombre = $request->nombre;
        $cliente->telefono = $request->telefono;
        $cliente->whatsapp = $request->whatsapp;
        $cliente->nota = $request->nota;
        $cliente->save();
        return redirect()->route('index.clientes');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return view('clientes.show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $cliente = Cliente::find($id);
        return view('clientes.edit', compact('cliente'));    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cliente = Cliente::find($id);
        $cliente->nombre = $request->nombre;
        $cliente->telefono = $request->telefono;
        $cliente->whatsapp = $request->whatsapp;
        $cliente->nota = $request->nota;
        $cliente->update();
        return redirect()->route('index.clientes');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    //API
    public function indexApi()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $clientes = Comercio::find($id_comercio)->clientes;
        return $clientes;
    }

    public function showApi(string $id)
    {
        $user = Auth::user();

        $cliente = Cliente::where('id', $id)
            ->where('comercio_id', $user->comercio_id)
            ->first();

        return $cliente;
    }

}
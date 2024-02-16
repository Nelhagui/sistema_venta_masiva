<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proveedor;
use App\Models\Comercio;
use Illuminate\Support\Facades\Auth;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('proveedores.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('proveedores.create');
    }

    public function edit(Proveedor $proveedor)
    {
        $user = Auth::user();
        if ($user->comercio_id == $proveedor->comercio_id)
            return view('proveedores.edit', compact('proveedor'));
        else
            return redirect()->action([ProveedorController::class, 'index']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proveedor $proveedor)
    {
        $user = Auth::user();
        if($user->comercio_id == $proveedor->comercio_id) {
            $proveedor->nombre = $request->nombre;
            $proveedor->direccion = $request->direccion;
            $proveedor->telefono = $request->telefono;
            $proveedor->whatsapp = $request->whatsapp;
            $proveedor->nota = $request->nota;
            $proveedor->update();
            return redirect()->route('index.proveedores');
        } else {
            return redirect()->route('index.proveedores');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proveedor $proveedor)
    {
        //
    }

    //API
    public function indexApi()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $proveedores = Comercio::find($id_comercio)->proveedores;
        return $proveedores;
    }

    public function storeApi(Request $request)
    {
        $user = Auth::user();
        $proveedor = new Proveedor;
        $proveedor->comercio_id = $user->comercio_id;
        $proveedor->nombre = $request->nombre;
        $proveedor->direccion = $request->direccion;
        $proveedor->telefono = $request->telefono;
        $proveedor->whatsapp = $request->whatsapp;
        $proveedor->nota = $request->nota;

        return $proveedor->save();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MetodoPago;
use Illuminate\Support\Facades\Auth;


class MetodoController extends Controller
{
    //LISTA
    public function index()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $metodos = MetodoPago::where('comercio_id', $id_comercio)->get();
        return view('metodos.index', compact('metodos'));
    }

    //CREAR
    public function create()
    {
        return view('metodos.create');
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $messages = [
            'nombre.required' => 'El campo Nombre es obligatorio.',
            'nombre.unique' => 'El nombre ya está en uso.',
           
        ];

        $request->validate([
            'nombre' => 'required',
        ], $messages);

        $metodo = new MetodoPago;
        $metodo->nombre = $request->nombre;
        $metodo->tipo_markup = 0;
        $metodo->estado = 1;
        $metodo->comercio_id = $id_comercio;
        $metodo->save();
        return redirect()->route('index.metodos');
        
    }

    //EDITAR
    public function edit(string $id)
    {
        $metodo = MetodoPago::find($id);
        return view('metodos.edit', compact('metodo'));
    }

    public function update(Request $request, string $id)
    {
        $messages = [
            'nombre.required' => 'El campo Nombre es obligatorio.',
            'nombre.unique' => 'El nombre ya está en uso.',
            'comision.required' => 'El campo Comisión es obligatorio.',
            'comision.numeric' => 'El campo Comisión debe ser un valor numérico.',
        ];
        
        $metodo = MetodoPago::find($id); // Primero obtenemos el método
        
        $request->validate([
            'nombre' => 'required|unique:metodos,nombre,' . $metodo->id,
            'comision' => 'required|numeric',
        ], $messages);
        
        $metodo->nombre = $request->nombre;
        $metodo->comision = $request->comision;
        $metodo->save(); // Utiliza save() para actualizar en lugar de update()
        return redirect()->route('index.metodos');
        
    }
    
}

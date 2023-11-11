<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Metodo;


class MetodoController extends Controller
{
    //LISTA
    public function index()
    {
        $metodos = Metodo::all();
        return view('metodos.index', compact('metodos'));
    }

    //CREAR
    public function create()
    {
        return view('metodos.create');
    }

    public function store(Request $request)
    {
        $messages = [
            'nombre.required' => 'El campo Nombre es obligatorio.',
            'nombre.unique' => 'El nombre ya está en uso.',
            'comision.required' => 'El campo Comisión es obligatorio.',
            'comision.numeric' => 'El campo Comisión debe ser un valor numérico.',
        ];

        $request->validate([
            'nombre' => 'required|unique:metodos,nombre',
            'comision' => 'required|numeric',
        ], $messages);

        $metodo = new Metodo;
        $metodo->nombre = $request->nombre;
        $metodo->comision = $request->comision;
        $metodo->save();
        return redirect()->route('index.metodos');
        
    }

    //EDITAR
    public function edit(string $id)
    {
        $metodo = Metodo::find($id);
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
        
        $metodo = Metodo::find($id); // Primero obtenemos el método
        
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

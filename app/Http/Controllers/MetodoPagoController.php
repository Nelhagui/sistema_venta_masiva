<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use App\Http\Requests\StoreMetodoPagoRequest;
use App\Http\Requests\UpdateMetodoPagoRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Comercio;
use Illuminate\Http\Request;

class MetodoPagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $metodos = MetodoPago::where('comercio_id', $id_comercio)->get();
        return view('metodos.index', compact('metodos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('metodos.create');
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
    public function edit(string $id)
    {
        $metodo = MetodoPago::find($id);
        return view('metodos.edit', compact('metodo'));    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $messages = [
            'nombre.required' => 'El campo Nombre es obligatorio.',
        ];
        
        $metodo = MetodoPago::find($id); // Primero obtenemos el método
        
        $request->validate([
            'nombre' => 'required' ,
        ], $messages);
        
        $metodo->nombre = $request->nombre;
        $metodo->save(); // Utiliza save() para actualizar en lugar de update()
        return redirect()->route('index.metodos');
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
            'predeterminado' => 1,
            'estado' => 1
        ];

        // Agregar el método de pago genérico a la lista de métodos de pago
        $metodosDePago[] = $metodoPagoGenerico;

        return $metodosDePago;
    }

    public function storeApi(Request $request)
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;

        $messages = [
            'nombre.required' => 'El campo Nombre es obligatorio.',           
        ];

        $request->validate([
            'nombre' => 'required',
        ], $messages);

        $metodoDePago = new MetodoPago;
        $metodoDePago->nombre = $request->nombre;
        $metodoDePago->comercio_id = $id_comercio;
        $metodoDePago->tipo_markup = 0;
        $metodoDePago->estado = 1;

        return $metodoDePago->save();

    }

    public function destroy(string $metodoPagoId) 
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;

        $metodoPago = MetodoPago::where('id', $metodoPagoId)->where('comercio_id', $id_comercio)->first();

        return $metodoPago->delete();

    }
}

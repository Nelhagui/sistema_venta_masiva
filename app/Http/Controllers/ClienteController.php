<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Pago;
use App\Models\Venta;
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
    public function show(Cliente $cliente)
    {
        $id = $cliente->id;
        return view('clientes.show', compact('id'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $cliente = Cliente::find($id);
        return view('clientes.edit', compact('cliente'));
    }

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

    public function updateFileView()
    {
        return view('clientes.importador.create');
    }


    //API
    public function indexApi()
    {
        // dd('listat');
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $clientes = Comercio::find($id_comercio)->clientes;
        return $clientes;
    }

    public function showApi(Request $request)
    {
        $user = Auth::user();
        $id = $request->id;
        $cliente = Cliente::where('id', $id)
            ->with('ventas')
            ->where('comercio_id', $user->comercio_id)
            ->first();
        if (!$cliente) {
            // Cliente no encontrado, puedes manejar este caso según tus necesidades
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }
        $deudas = $cliente->ventas()->where('estado_pago', '!=', 'cobrada')->with(['pagos', 'detalles'])->get();
        $ventas = $cliente->ventas()->with(['pagos', 'detalles'])->get();

        $cliente->deudas = $deudas;
        $cliente->todas_las_ventas = $ventas;
        return $cliente;
    }

    public function storeApi(Request $request)
    {
        $user = Auth::user();
        $cliente = new Cliente;
        $cliente->comercio_id = $user->comercio_id;
        $cliente->nombre = $request->nombre;
        $cliente->telefono = $request->telefono;
        $cliente->whatsapp = $request->whatsapp;
        $cliente->nota = $request->nota;

        return $cliente->save();
    }

    public function saldarDeudaApi(Request $request)
    {
        DB::beginTransaction();

        try {
            $user = Auth::user();
            $cliente = Cliente::where('id', $request->cliente)
                ->where('comercio_id', $user->comercio_id)
                ->first();

            if (isset($cliente)) {
                $ventasRequest = collect($request->deudas);
                $arrayIdsVentas = $ventasRequest->pluck('id')->toArray();

                $ventas = Venta::whereIn('id', $arrayIdsVentas)
                    ->with('pagos')
                    ->where('comercio_id', $user->comercio_id)
                    ->get();

                // CREO LOS PAGOS PARA LAS VENTAS CON COBRO PENDIENTES
                foreach ($ventas as $venta) {
                    $valor_total_venta = $venta->monto_total_venta;
                    $total_pagos_parciales = 0;
                    foreach ($venta->pagos as $pago) {
                        $total_pagos_parciales = $total_pagos_parciales + $pago->monto_pagado;
                    }
                    $resta_abonar = $valor_total_venta - $total_pagos_parciales;

                    $pago = new Pago;
                    $pago->venta_id = $venta->id;
                    $pago->fecha_pago = now();
                    $pago->monto_pagado = $resta_abonar;
                    if(is_array($request->metodoPago)) {
                        $pago->metodos_de_pago = implode(', ', $request->metodoPago);
                    } else {
                        $pago->metodos_de_pago = $request->metodoPago;
                    }
                    $pago->save();


                    $ventaDb = Venta::find($venta->id);
                    $ventaDb->estado_pago = Venta::COBRADA;
                    $ventaDb->metodos_de_pago = $pago->metodos_de_pago;
                    $ventaDb->update();
                }
            } else {
                return response()->json(['error' => 'Ocurrió un error al procesar la solicitud'], 500);
            }


            DB::commit();

            return [
                "deudas" => $cliente->ventas()->where('estado_pago', '!=', 'cobrada')->with('pagos')->get(),
                "ventas" => $cliente->ventas()->with('pagos')->get(),
            ];

        } catch (\Exception $e) {
            // Si ocurre una excepción, deshacer la transacción
            DB::rollback();

            // Devolver el mensaje de error de la excepción
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
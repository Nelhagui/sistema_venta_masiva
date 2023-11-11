<?php

namespace App\Http\Controllers;

use App\Models\DetalleVenta;
use App\Models\Producto;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Venta;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ventas = Venta::orderBy('created_at', 'desc')->paginate(15);
        return view('ventas.index', compact('ventas'));
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

    }

    public function storeApi(Request $request)
    {
        return $request;
        $monto_total_costo = 0;
        $monto_total_venta = 0;
        $user = Auth::user();

        // VENTA
        $venta = new Venta;
        $venta->sesion_caja_id = 1;
        $venta->user_id = $user->id;
        

        // DETALLE VENTA
        $productos = $request->productos;
        foreach ($productos as $producto) {

            $productoDb = Producto::find($producto->id);
            $detalle_venta = new DetalleVenta;
            $detalle_venta->venta_id = $venta->id;
            $detalle_venta->producto_id = $productoDb->id;
            $detalle_venta->cantidad = $producto->cantidad;
            $detalle_venta->precio_unitario = $productoDb->precio_venta;
            $detalle_venta->costo_unitario = $productoDb->precio_costo;

            $monto_total_venta = $monto_total_venta+($productoDb->precio_venta * $producto->cantidad);
            $monto_total_costo = $monto_total_costo+($productoDb->precio_costo * $producto->cantidad);
        }

        $venta->monto_total_venta = $monto_total_venta;
        $venta->monto_total_costo = $monto_total_costo;
        $venta->fecha_venta = date('Y-m-d H:i:s');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $venta = Venta::with('detalles')->find($id);
        return view('ventas.show', compact('venta'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
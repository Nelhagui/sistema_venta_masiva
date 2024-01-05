<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use App\Models\Compra;
use App\Models\CompraDetalle;
use App\Models\Proveedor;
use App\Models\Inversor;
use App\Models\Producto;
use App\Models\InversorProducto;
use App\Models\Lote;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;


class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $compras = Compra::orderBy('id', 'desc')->paginate(50);
        return view('compras.index', compact('compras'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productos = Producto::all();
        $proveedores = Proveedor::all();
        $inversores = Inversor::all();
        return view('compras.create', compact('productos', 'proveedores', 'inversores'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $productos = $request->productos;
        $datosCompra = $request->datosCompra;

        $messages = [
            'precio_venta.required' => 'El campo Precio de venta es obligatorio.',
            'precio_venta.numeric' => 'El campo Precio de venta debe ser un valor numérico.',
            'precio_costo.required' => 'El campo Precio de costo es obligatorio.',
            'precio_costo.numeric' => 'El campo Precio de costo debe ser un valor numérico.',
            'stock.required' => 'El campo Stock es obligatorio.',
            'stock.numeric' => 'El campo Stock debe ser un valor numérico.',
        ];

        $rules = [
            'productos.*.descripcion' => ['nullable', 'sometimes', 'string'],
            'productos.*.precio_costo' => 'required|numeric',
            'productos.*.precio_venta' => 'required|numeric',
            'productos.*.stock' => 'required|numeric',
            'productos.*.usar_control_por_lote' => 'required|boolean',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 400); // Código HTTP 400 para peticiones incorrectas
        }

        $totalCompra = 0; // Variable para almacenar el total de la compra

        // Iterar sobre los productos para calcular el costo total de la compra
        foreach ($productos as $producto) {
            $totalCompra += $producto['stock'] * $producto['precio_costo'];
        }

        $compra = new Compra;
        $compra->fecha_compra = $datosCompra['fechaCompra'] ?? now();;
        $compra->fecha_carga = date('Y-m-d H:i:s');
        $compra->precio_total = $totalCompra;
        $compra->numero_factura = $datosCompra['nroFactura'] ?? "";
        $compra->proveedor_id = $datosCompra['proveedor'] ?? "";
        $compra->save();


        DB::transaction(function () use ($productos, $compra) {
            foreach ($productos as $producto) {

                $productoDB = Producto::find($producto['id']);
                $productoDB->precio_venta = $producto['precio_venta'];
                $productoDB->precio_costo = $producto['precio_costo'];
                $productoDB->stock_actual = $productoDB->stock_actual + $producto['stock'];
                $productoDB->usar_control_por_lote = $producto['usar_control_por_lote'];
                $productoDB->update();


                if ($producto['usar_control_por_lote']) {
                    $newLoteProducto = new Lote;
                    $newLoteProducto->producto_id = $producto['id'];
                    $newLoteProducto->compra_id = $compra->id;
                    $newLoteProducto->fecha_vencimiento = $producto['fecha_vencimiento'] ?? null;
                    $newLoteProducto->precio_costo = $producto['precio_costo'];
                    $newLoteProducto->precio_venta = $producto['precio_venta'];
                    $newLoteProducto->precio_dolar = $producto['precio_dolar'] ?? null;
                    $newLoteProducto->cantidad_inicial = $producto['stock'];
                    $newLoteProducto->cantidad_restante = $producto['stock'];
                    $newLoteProducto->save();

                }

                if($producto['inversor_id'] !== null && $producto['inversor_id'] !== "") {
                    $inversorProducto = new InversorProducto;
                    $inversorProducto->model()->associate($productoDB);
                    $inversorProducto->cantidad_producto_invertido = $producto['stock'];
                    $inversorProducto->inversor_id = $producto['inversor_id'];
                    $inversorProducto->save();
                }

                $detalleCompra = new CompraDetalle;
                $detalleCompra->compra_id = $compra->id;
                $detalleCompra->producto_id = $producto['id'];
                $detalleCompra->precio_unitario = $producto['precio_costo'];
                $detalleCompra->cantidad = $producto['stock'];
                $detalleCompra->precio_total = $compra->precio_total;
                $detalleCompra->save();


            }
        });

        return response()->json(['status' => 'success', 'message' => 'Productos insertados con éxito.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Compra $compra)
    {
        return view('compras.show', compact('compra'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Compra $compra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Compra $compra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Compra $compra)
    {
        //
    }
}

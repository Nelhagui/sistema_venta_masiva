<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Lote;


use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\ProductosBase;
use App\Models\Proveedor;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::all();
        return view('productos.index', compact('productos'));
    }

    public function indexProductosBase()
    {
        $proveedores = Proveedor::all();
        return view('productos.productos_base.index', compact('proveedores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $proveedores = Proveedor::all();

        return view('productos.create', compact('proveedores'));
    }

    public function busqueda($busqueda)
    {
        $productos = ProductosBase::where('titulo', 'LIKE', '%' . $busqueda . '%')
            ->orWhere('codigo_barra', '=', $busqueda)
            ->orderBy('titulo', 'ASC')
            ->get();
        return $productos;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [
            'productos.*.titulo.required' => 'El campo Título es obligatorio.',
            'productos.*.titulo.unique' => 'El título ya está en uso.',
            'productos.*.precio_venta.required' => 'El campo Precio de venta es obligatorio.',
            'productos.*.precio_venta.numeric' => 'El campo Precio de venta debe ser un valor numérico.',
            'productos.*.precio_costo.required' => 'El campo Precio de costo es obligatorio.',
            'productos.*.precio_costo.numeric' => 'El campo Precio de costo debe ser un valor numérico.',
            'productos.*.stock.required' => 'El campo Stock es obligatorio.',
            'productos.*.stock.numeric' => 'El campo Stock debe ser un valor numérico.',
            'productos.*.codigo_barra.numeric' => 'El campo requiere números.',
            'productos.*.codigo_barra.unique' => 'El código de barras ya ha sigo registrado.',
        ];

        $request->validate([
            'productos.*.titulo' => 'required|unique:productos,titulo,',
            'productos.*.precio_venta' => 'required|numeric',
            'productos.*.precio_costo' => 'required|numeric',
            'productos.*.stock' => 'required|numeric',
            'productos.*.codigo_barra' => ['nullable', 'sometimes', 'numeric', 'unique:productos,codigo_barra,'],
        ], $messages);

        foreach ($request->input('productos') as $productoData) {
            $producto = new Producto;
            $producto->titulo = $productoData['titulo'];
            $producto->precio_venta = $productoData['precio_venta'];
            $producto->precio_costo = $productoData['precio_costo'];
            $producto->stock_actual = $productoData['stock'];
            $producto->codigo_barra = $productoData['codigo_barra'];
            $producto->usar_control_por_lote = isset($productoData['control_por_lote']);
            $producto->save();
    
            // Agrega lógica adicional si es necesario, por ejemplo, para lotes
            if (isset($productoData['control_por_lote'])) {
                $newLoteProducto = new Lote;
                $newLoteProducto->producto_id = $producto->id;
                $newLoteProducto->fecha_compra = $productoData['fecha_compra'] ?? now();
                $newLoteProducto->fecha_vencimiento = $productoData['fecha_vencimiento'] ?? null;
                $newLoteProducto->numero_factura = $productoData['numero_factura'] ?? null;
                $newLoteProducto->proveedor_id = $productoData['proveedor_id'] ?? null;
                $newLoteProducto->precio_costo = $productoData['precio_costo']; // Asegúrate de ajustar esto según tu estructura
                $newLoteProducto->precio_venta = $productoData['precio_venta']; // Asegúrate de ajustar esto según tu estructura
                $newLoteProducto->precio_dolar = $productoData['precio_dolar'] ?? null;
                $newLoteProducto->cantidad_inicial = $productoData['stock']; // Asegúrate de ajustar esto según tu estructura
                $newLoteProducto->cantidad_restante = $productoData['stock']; // Asegúrate de ajustar esto según tu estructura
                $newLoteProducto->save();
            }
        }

        return redirect()->route('create.productos');
    }

    public function storeDesdeBase(Request $request)
    {
        $productos = $request->productos;

        $messages = [
            'titulo.required' => 'El campo Título es obligatorio.',
            'titulo.unique' => 'El título ya está en uso.',
            'precio_venta.required' => 'El campo Precio de venta es obligatorio.',
            'precio_venta.numeric' => 'El campo Precio de venta debe ser un valor numérico.',
            'precio_costo.required' => 'El campo Precio de costo es obligatorio.',
            'precio_costo.numeric' => 'El campo Precio de costo debe ser un valor numérico.',
            'stock.required' => 'El campo Stock es obligatorio.',
            'stock.numeric' => 'El campo Stock debe ser un valor numérico.',
            'codigo_barra.numeric' => 'El campo requiere números.',
            'codigo_barra.unique' => 'El código de barras ya ha sigo registrado.',
        ];

        $rules = [
            'productos.*.titulo' => 'required|unique:productos,titulo,',
            'productos.*.descripcion' => ['nullable', 'sometimes', 'string'],
            'productos.*.precio_costo' => 'required|numeric',
            'productos.*.precio_venta' => 'required|numeric',
            'productos.*.stock' => 'required|numeric',
            'productos.*.codigo_barra' => ['nullable', 'sometimes', 'numeric', 'unique:productos,codigo_barra,'],
            'productos.*.usar_control_por_lote' => 'required|boolean',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 400); // Código HTTP 400 para peticiones incorrectas
        }

        DB::transaction(function () use ($productos) {
            foreach ($productos as $producto) {
                $newProducto = new Producto;
                $newProducto->titulo = ucwords($producto['titulo']);
                $newProducto->codigo_barra = $producto['codigo_barra'];
                $newProducto->usar_control_por_lote = $producto['usar_control_por_lote'];
                $newProducto->habilitado = $producto['habilitado'];
                $newProducto->precio_venta = $producto['precio_venta'];
                $newProducto->precio_costo = $producto['precio_costo'];
                $newProducto->stock_actual = $producto['stock'];
                $newProducto->save();

                if ($producto['usar_control_por_lote']) {
                    $newLoteProducto = new Lote;
                    $newLoteProducto->producto_id = $newProducto->id;
                    $newLoteProducto->fecha_compra = $producto['fecha_compra'] ?? now();
                    $newLoteProducto->fecha_vencimiento = $producto['fecha_vencimiento'] ?? null;
                    $newLoteProducto->numero_factura = $producto['numero_factura'] ?? null;
                    $newLoteProducto->proveedor_id = $producto['proveedor_id'] ?? null;
                    $newLoteProducto->precio_costo = $producto['precio_costo'];
                    $newLoteProducto->precio_venta = $producto['precio_venta'];
                    $newLoteProducto->precio_dolar = $producto['precio_dolar'] ?? null;
                    $newLoteProducto->cantidad_inicial = $producto['stock'];
                    $newLoteProducto->cantidad_restante = $producto['stock'];
                    $newLoteProducto->save();
                }

            }
        });

        return response()->json(['status' => 'success', 'message' => 'Productos insertados con éxito.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $producto = Producto::find($id);
        return view('productos.edit', compact('producto'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $producto = Producto::find($id);
        return view('productos.edit', compact('producto'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $messages = [
            'titulo.required' => 'El campo Título es obligatorio.',
            'titulo.unique' => 'El título ya está en uso.',
            'precio_venta.required' => 'El campo Precio de venta es obligatorio.',
            'precio_venta.numeric' => 'El campo Precio de venta debe ser un valor numérico.',
            'precio_costo.required' => 'El campo Precio de costo es obligatorio.',
            'precio_costo.numeric' => 'El campo Precio de costo debe ser un valor numérico.',
            'stock.required' => 'El campo Stock es obligatorio.',
            'stock.numeric' => 'El campo Stock debe ser un valor numérico.',
            'codigo_barra.numeric' => 'El campo requiere números.',
            'codigo_barra.unique' => 'El código de barras ya ha sigo registrado.',
        ];

        $producto = Producto::find($id); // Primero obtenemos el producto

        $request->validate([
            'titulo' => 'required|unique:productos,titulo,',
            'precio_venta' => 'required|numeric',
            'precio_costo' => 'required|numeric',
            'stock' => 'required|numeric',
            'codigo_barra' => ['nullable', 'sometimes', 'numeric', 'size:13', 'unique:productos,codigo_barra,'],
        ], $messages);

        $producto->titulo = $request->titulo;
        $producto->precio_venta = $request->precio_venta;
        $producto->precio_costo = $request->precio_costo;
        $producto->stock = $request->stock;
        $producto->codigo_barra = $request->codigo_barra;
        $producto->save();

        return redirect()->route('index.productos');

    }

    public function createStock()
    {
        return view('productos.stock.create');
    }

    public function updateStockProductos(Request $request)
    {
        $productos = $request->productos;
        $messages = [
            'titulo.required' => 'El campo Título es obligatorio.',
            'nuevo_stock.required' => 'El campo Stock es obligatorio.',
            'nuevo_stock.numeric' => 'El campo Stock debe ser un valor numérico.',
            'codigo_barra.numeric' => 'El campo requiere números.',
        ];

        $rules = [
            'productos.*.titulo' => 'required',
            'productos.*.descripcion' => ['nullable', 'sometimes', 'string'],
            'productos.*.nuevo_stock' => 'required|numeric',
            'productos.*.usar_control_por_lote' => 'required|boolean',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 400); // Código HTTP 400 para peticiones incorrectas
        }

        DB::transaction(function () use ($productos) {
            foreach ($productos as $producto) {
                $updateProducto = Producto::find($producto['id']);
                $updateProducto->stock_actual = $updateProducto['stock_actual'] + $producto['nuevo_stock'];
                $updateProducto->update();

                if ($producto['usar_control_por_lote']) {
                    $newLoteProducto = new Lote;
                    $newLoteProducto->producto_id = $updateProducto->id;
                    $newLoteProducto->fecha_compra = $producto['fecha_compra'] ?? now();
                    $newLoteProducto->fecha_vencimiento = $producto['fecha_vencimiento'] ?? null;
                    $newLoteProducto->numero_factura = $producto['numero_factura'] ?? null;
                    $newLoteProducto->proveedor_id = $producto['proveedor_id'] ?? null;
                    $newLoteProducto->precio_costo = $producto['precio_costo']; // Asegúrate de ajustar esto según tu estructura
                    $newLoteProducto->precio_venta = $producto['precio_venta']; // Asegúrate de ajustar esto según tu estructura
                    $newLoteProducto->precio_dolar = $producto['precio_dolar'] ?? null;
                    $newLoteProducto->cantidad_inicial = $producto['nuevo_stock'];
                    $newLoteProducto->cantidad_restante = $producto['nuevo_stock'];
                    $newLoteProducto->save();
                }

            }
        });

        return response()->json(['status' => 'success', 'message' => 'Productos insertados con éxito.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function actualizarStock()
    {

    }
}
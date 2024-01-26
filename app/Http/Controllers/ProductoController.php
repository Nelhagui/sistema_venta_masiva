<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Lote;
use App\Models\Producto;
use App\Models\Comercio;
use App\Models\ProductosBase;
use App\Models\Proveedor;
use App\Models\Inversor;
use App\Models\InversorProducto;

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
        $inversores = Inversor::all();

        return view('productos.create', compact('proveedores', 'inversores'));
    }

    public function busquedaProductosBase($busqueda)
    {
        $productos = ProductosBase::where('titulo', 'LIKE', '%' . $busqueda . '%')
            ->orWhere('codigo_barra', '=', $busqueda)
            ->orderBy('titulo', 'ASC')
            ->get();
        return $productos;
    }

    
    public function busqueda($busqueda)
    {
        $productos = Producto::where('titulo', 'LIKE', '%' . $busqueda . '%')
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
            'productos.*.codigo_barra.numeric' => 'El campo requiere números.',
            'productos.*.codigo_barra.unique' => 'El código de barras ya ha sigo registrado.',
        ];

        $request->validate([
            'productos.*.titulo' => 'required|unique:productos,titulo,',
            'productos.*.codigo_barra' => ['nullable', 'sometimes', 'numeric', 'unique:productos,codigo_barra,'],
        ], $messages);

        foreach ($request->input('productos') as $productoData) {
            $producto = new Producto;
            $producto->titulo = $productoData['titulo'];
            $producto->codigo_barra = $productoData['codigo_barra'];
            $producto->save();

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
            'codigo_barra' => ['nullable', 'sometimes', 'numeric', 'unique:productos,codigo_barra,'],
        ], $messages);

        $producto->titulo = $request->titulo;
        $producto->precio_venta = $request->precio_venta;
        $producto->precio_costo = $request->precio_costo;
        $producto->stock_actual = $request->stock;
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

                
                if(!$producto['usar_control_por_lote'] && $producto['inversor_id'] !== null && $producto['inversor_id'] !== '') {
                    $inversorProducto = new InversorProducto;
                    $inversorProducto->model()->associate($updateProducto);
                    $inversorProducto->cantidad_producto_invertido = $producto['nuevo_stock'];
                    $inversorProducto->inversor_id = $producto['inversor_id'];
                    $inversorProducto->save();
                }

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

                    if($producto['inversor_id'] !== null && $producto['inversor_id'] !== '') {
                        $newInversorProducto = new InversorProducto;
                        $newInversorProducto->model()->associate($newLoteProducto);
                        $newInversorProducto->cantidad_producto_invertido = $producto['nuevo_stock'];
                        $newInversorProducto->inversor_id = $producto['inversor_id'];
                        $newInversorProducto->save();
                    }
                }

            }
        });

        return response()->json(['status' => 'success', 'message' => 'Productos insertados con éxito.']);
    }


    public function updateFileView()
    {
        return view('productos.importador.create');
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

    public function stockPrecio()
    {
        $productos = Producto::all();
        $proveedores = Proveedor::all();
        $inversores = Inversor::all();
        return view('productos.stockPrecio', compact('productos', 'proveedores', 'inversores'));
    }


    //API
    public function indexApi()
    {
        $user = Auth::user();
        $id_comercio = $user->comercio_id;
        $productos = Comercio::find($id_comercio)->productos;
        return $productos;
    }

    public function apiStockPrecio(Request $request)
    {
        $productosSeleccionados = $request->productos;
        $nuevosProductos = $request->nuevosProductos;
        $datosCompra = $request->datosCompra;

        // Convierte los datos a colecciones si no lo están
        $coleccionProductos = collect($productosSeleccionados);
        $coleccionNuevosProductos = collect($nuevosProductos);

        // Fusiona las colecciones
        $productos = $coleccionProductos->merge($coleccionNuevosProductos)->all();
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

                if(isset($producto['id'])) {
                    $productoDB = Producto::find($producto['id']);
                } else {
                    $productoDB = new Producto;
                    $productoDB->titulo = $producto['titulo'];
                    $productoDB->codigo_barra = $producto['codigo_barra'];
                    $productoDB->save();
                }
                $productoDB->precio_venta = $producto['precio_venta'];
                $productoDB->precio_costo = $producto['precio_costo'];
                $productoDB->stock_actual = $productoDB->stock_actual + $producto['stock'];
                $productoDB->usar_control_por_lote = $producto['usar_control_por_lote'] == "on" ? 1 : 0;
                $productoDB->update();

                if ($producto['usar_control_por_lote']) {
                    $newLoteProducto = new Lote;
                    $newLoteProducto->producto_id = $productoDB->id;
                    $newLoteProducto->compra_id = $compra->id;
                    $newLoteProducto->fecha_vencimiento = $producto['fecha_vencimiento'] ?? null;
                    $newLoteProducto->precio_costo = $producto['precio_costo'];
                    $newLoteProducto->precio_venta = $producto['precio_venta'];
                    $newLoteProducto->precio_dolar = $producto['precio_dolar'] ?? null;
                    $newLoteProducto->cantidad_inicial = $producto['stock'];
                    $newLoteProducto->cantidad_restante = $producto['stock'];
                    $newLoteProducto->save();

                }

                if(isset($producto['inversor_id'])) {
                    $inversorProducto = new InversorProducto;
                    $inversorProducto->model()->associate($productoDB);
                    $inversorProducto->cantidad_producto_invertido = $producto['stock'];
                    $inversorProducto->inversor_id = $producto['inversor_id'];
                    $inversorProducto->save();
                }

                $detalleCompra = new CompraDetalle;
                $detalleCompra->compra_id = $compra->id;
                $detalleCompra->producto_id = $productoDB->id;
                $detalleCompra->precio_unitario = $producto['precio_costo'];
                $detalleCompra->cantidad = $producto['stock'];
                $detalleCompra->precio_total = $compra->precio_total;
                $detalleCompra->save();


            }
        });

        return response()->json(['status' => 'success', 'message' => 'Productos insertados con éxito.']);
    }
}
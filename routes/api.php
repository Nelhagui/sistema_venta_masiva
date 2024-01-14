<?php

use App\Http\Controllers\VentaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Producto;
use App\Models\Cliente;
use App\Models\Compra;
use App\Models\Proveedor;
use App\Models\Inversor;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\MetodoPagoController;
use App\Http\Controllers\CompraController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/productos', function () {
    $productos = Producto::all();
    return $productos;
});

Route::get('/clientes', function () {
    $clientes = Cliente::all();
    return $clientes;
});

Route::get('/metodos-pago', [MetodoPagoController::class, 'index']);

Route::get('/productos-base/busqueda/{busqueda}', [ProductoController::class, 'busquedaProductosBase']);
Route::get('/productos/busqueda/{busqueda}', [ProductoController::class, 'busqueda']);
 

Route::get('/proveedores', function () {
    $proveedores = Proveedor::all();
    return $proveedores;
});

Route::get('/inversores', function () {
    $inversores = Inversor::all();
    return $inversores;
});

Route::post('/productos/base/agregar', [ProductoController::class, 'storeDesdeBase']);
Route::post('/productos/actualizar/stock', [ProductoController::class, 'updateStockProductos']);


Route::get('/compras', function () {
    $compras = Compra::with('proveedor')->get();
    return $compras;
});

Route::post('/compras/agregar', [CompraController::class, 'store']);

Route::post('/ventas/crear', [VentaController::class, 'storeApi']);

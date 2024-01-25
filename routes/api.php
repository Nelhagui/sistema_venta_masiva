<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\VentaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Producto;
use App\Models\Cliente;
use App\Models\Compra;
use App\Models\Proveedor;
use App\Models\Inversor;
use App\Models\Venta;
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



Route::middleware('auth')->group(function () {
    
    // CLIENTES
    Route::prefix('clientes')->group(function () {
        Route::get('/', [ClienteController::class, 'indexApi']);
        Route::get('/detalle/{id}', [ClienteController::class, 'showApi']);
    });

    // PRODUCTOS
    Route::get('/productos', [ProductoController::class, 'indexApi']);

    // METODOS DE PAGO
    Route::get('/metodos-pago', [MetodoPagoController::class, 'indexApi']);

    // VENTAS
    Route::prefix('ventas')->group(function () {
        Route::post('/', [VentaController::class, 'indexApi']);
        Route::post('/crear', [VentaController::class, 'storeApi']);
    });
});
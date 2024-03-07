<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\InversionController;
use App\Http\Controllers\InversorController;
use App\Http\Controllers\ProductosBaseController;
use App\Http\Controllers\ProveedorController;
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


// Route::post('/productos/base/agregar', [ProductoController::class, 'storeDesdeBase']);
Route::post('/productos/actualizar/stock', [ProductoController::class, 'updateStockProductos']);


Route::get('/compras', function () {
    $compras = Compra::with('proveedor')->get();
    return $compras;
});


Route::middleware('auth')->group(function () {
    
    // CLIENTES
    Route::prefix('clientes')->group(function () {
        Route::get('/', [ClienteController::class, 'indexApi']);
        Route::post('/crear', [ClienteController::class, 'storeApi']);
        Route::post('/deudas/saldar', [ClienteController::class, 'saldarDeudaApi']);
        Route::post('/detalle', [ClienteController::class, 'showApi']);
    });

    // PRODUCTOS
    Route::get('/productos', [ProductoController::class, 'indexApi']);
    Route::post('/productos', [ProductoController::class, 'apiStoreProducto']);
    Route::post('/productos/stock-precio', [ProductoController::class, 'apiStockPrecio']);
    Route::post('/productos/subir/archivo', [ProductoController::class, 'apiSubirExcel']);

    // METODOS DE PAGO
    Route::get('/metodos-pago', [MetodoPagoController::class, 'indexApi']);
    Route::post('/metodos-pago', [MetodoPagoController::class, 'storeApi']);
    Route::post('/metodos-pago/eliminar/{metodoPagoId}', [MetodoPagoController::class, 'destroy']);

    // VENTAS
    Route::prefix('ventas')->group(function () {
        Route::get('/', [VentaController::class, 'indexApi']);
        Route::post('/crear', [VentaController::class, 'storeApi']);
        Route::post('/anular', [VentaController::class, 'anularVentaApi']);
    });

    // PROVEEDORES
    Route::prefix('proveedores')->group(function () {
        Route::get('/', [ProveedorController::class, 'indexApi']);
        Route::post('/crear', [ProveedorController::class, 'storeApi']);
    });
    
    // INVERSORES
    Route::prefix('inversores')->group(function () {
        Route::get('/', [InversorController::class, 'indexApi']);
        Route::post('/detalle', [InversorController::class, 'showApi']);
        Route::post('/crear', [InversorController::class, 'storeApi']);
    });

    // INVERSIONES
    Route::prefix('inversiones')->group(function () {
        Route::get('/', [InversionController::class, 'indexApi']);
        Route::post('/crear', [InversionController::class, 'storeApi']);
        Route::get('/detalle/{id}', [InversionController::class, 'showApi']);
    });

    // PRODUCTOS BASE
    Route::post('/productos-base/busqueda-titulos', [ProductosBaseController::class, 'busqueda']);
});
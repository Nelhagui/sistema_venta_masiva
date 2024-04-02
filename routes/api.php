<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\InversionController;
use App\Http\Controllers\InversorController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\PagoInversionController;
use App\Http\Controllers\ProductosBaseController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\SesionCajaController;
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
use App\Http\Controllers\CajaMovimientoController;

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

    // CAJA
    Route::prefix('caja')->group(function () {
        Route::get('/', [SesionCajaController::class, 'showApi']);
        Route::get('/egresos', [CajaMovimientoController::class, 'createEgresoApi']);
        Route::get('/ingresos', [CajaMovimientoController::class, 'createIngresoApi']);
        Route::post('/cierre-caja', [SesionCajaController::class, 'storeCierreApi']);
        Route::post('/egresos/cargar', [CajaMovimientoController::class, 'storeEgresoApi']);
        Route::post('/ingresos/cargar', [CajaMovimientoController::class, 'storeIngresoApi']);
    });
    
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
        Route::get('/{sesionCajaId}', [VentaController::class, 'indexSesionApi']);
        Route::get('/ver/{id}', [VentaController::class, 'showApi']);
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
        Route::post('/detalle', [InversionController::class, 'showApi']);
        Route::post('/crear', [InversionController::class, 'storeApi']);
        Route::post('/pagos/crear', [PagoInversionController::class, 'storeApi']);
    });

    // PRODUCTOS BASE
    Route::post('/productos-base/busqueda-titulos', [ProductosBaseController::class, 'busqueda']);
});
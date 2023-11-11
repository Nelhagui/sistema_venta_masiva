<?php

use App\Http\Controllers\CajaMovimientoController;
use App\Http\Controllers\SesionCajaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LectorController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\MetodoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // PROFILE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('verified')->group(function () {
        //PRODUCTOS
        Route::get('/productos', [ProductoController::class, 'index'])->name('index.productos');
        Route::get('/productos/agregar', [ProductoController::class, 'create'])->name('create.productos');
        Route::post('/productos/agregar', [ProductoController::class, 'store'])->name('store.productos');
        Route::get('/productos/editar/{id}', [ProductoController::class, 'edit'])->name('edit.productos');
        Route::post('/productos/editar/{id}', [ProductoController::class, 'update'])->name('update.productos');
        Route::get('/productos/update/stock', [ProductoController::class, 'createStock'])->name('create.productosStock');

        //PRODUCTOS BASE
        Route::get('/productos/base', [ProductoController::class, 'indexProductosBase'])->name('index.productosBase');

        //CLIENTES
        Route::get('/clientes', [ClienteController::class, 'index'])->name('index.clientes');
        Route::get('/clientes/agregar', [ClienteController::class, 'create'])->name('create.clientes');
        Route::post('/clientes/agregar', [ClienteController::class, 'store'])->name('store.clientes');
        Route::get('/clientes/editar/{id}', [ClienteController::class, 'edit'])->name('edit.clientes');
        Route::post('/clientes/editar/{id}', [ClienteController::class, 'update'])->name('update.clientes');

        // VENTAS
        Route::get('/ventas', [VentaController::class, 'index'])->name('index.ventas');
        Route::get('/ventas/{id}', [VentaController::class, 'show'])->name('show.ventas');

        // CAJA
        Route::get('/cajas', [SesionCajaController::class, 'index'])->name('index.cajas');
        Route::get('/caja', [SesionCajaController::class, 'show'])->name('show.cajas')->middleware('checksesion');
        Route::get('/caja-detalle/{sesionCaja}', [SesionCajaController::class, 'showDetalle'])->name('showDetalle.cajas');
        Route::get('/apertura-caja', [SesionCajaController::class, 'createApertura'])->name('create.aperturaCaja')->middleware('checksesion');
        Route::post('/apertura-caja', [SesionCajaController::class, 'storeApertura'])->name('store.aperturaCaja');

        // GASTOS
        Route::get('/gastos', [SesionCajaController::class, 'index'])->name('index.gastos');

        // MOVIMIENTOS 
        Route::middleware('checksesion')->group(function () { //todos los movimientos de caja tiene que validar antes que esté en una sesion caja
            Route::get('/caja/cargar-ingreso', [CajaMovimientoController::class, 'createIngreso'])->name('create.ingresoCaja');
            Route::post('/caja/cargar-ingreso/{sesionCajaId}', [CajaMovimientoController::class, 'agregarDinero'])->name('store.ingresoCaja');
            Route::get('/caja/cargar-egreso', [CajaMovimientoController::class, 'createEgreso'])->name('create.egresoCaja');
            Route::post('/caja/cargar-egreso/{sesionCajaId}', [CajaMovimientoController::class, 'retirarDinero'])->name('store.egresoCaja');
        });

        //LECTOR
        Route::get('/lector', [LectorController::class, 'index'])->name('index.lector')->middleware('checksesion');
        
        //METODOS
        Route::get('/metodos', [MetodoController::class, 'index'])->name('index.metodos');
        Route::get('/metodos/agregar', [MetodoController::class, 'create'])->name('create.metodos');
        Route::post('/metodos/agregar', [MetodoController::class, 'store'])->name('store.metodos');
        Route::get('/metodos/editar/{id}', [MetodoController::class, 'edit'])->name('edit.metodos');
        Route::post('/metodos/editar/{id}', [MetodoController::class, 'update'])->name('update.metodos');
    });


});

require __DIR__ . '/auth.php';
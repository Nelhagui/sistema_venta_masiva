<?php

use App\Http\Controllers\CajaMovimientoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InversionController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\SesionCajaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LectorController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\MetodoPagoController;
use App\Http\Controllers\InversorController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\LoteController;
use App\Http\Controllers\CompraController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified', 'verificarPais'])->name('dashboard');

Route::middleware(['auth', 'verificarPais'])->group(function () {

    // PROFILE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('verified')->group(function () {

        //PRODUCTOS
        Route::prefix('productos')->group(function () {
            Route::get('/', [ProductoController::class, 'index'])->name('index.productos');
            Route::get('/agregar', [ProductoController::class, 'create'])->name('create.productos');
            Route::post('/agregar', [ProductoController::class, 'store'])->name('store.productos');
            Route::get('/editar/{id}', [ProductoController::class, 'edit'])->name('edit.productos');
            Route::post('/editar/{id}', [ProductoController::class, 'update'])->name('update.productos');
            // Route::get('/update/stock', [ProductoController::class, 'createStock'])->name('create.productosStock');
            // Route::get('/actualizar-stock', [ProductoController::class, 'actualizarStock'])->name('create.actualizarStock');
            Route::get('/importar', [ProductoController::class, 'updateFileView'])->name('create.productos.fileUpdate');
            Route::get('/stock-precio', [ProductoController::class, 'stockPrecio'])->name('create.stockPrecio');
        });


        //COMPRAS
        Route::get('/compras', [CompraController::class, 'index'])->name('index.compras');
        Route::get('/compras/agregar', [CompraController::class, 'create'])->name('create.compras');
        Route::get('/compras/{compra}', [CompraController::class, 'show'])->name('show.compras');

        //CLIENTES
        Route::prefix('clientes')->group(function () {
            Route::get('/', [ClienteController::class, 'index'])->name('index.clientes');
            Route::get('/agregar', [ClienteController::class, 'create'])->name('create.clientes');
            Route::post('/agregar', [ClienteController::class, 'store'])->name('store.clientes');
            Route::get('/detalle', [ClienteController::class, 'show'])->name('show.clientes');
            Route::get('/editar/{id}', [ClienteController::class, 'edit'])->name('edit.clientes');
            Route::post('/editar/{id}', [ClienteController::class, 'update'])->name('update.clientes');
            Route::get('/importar', [ClienteController::class, 'updateFileView'])->name('create.clientes.fileUpdate');
        });

        //INVERSORES
        Route::prefix('inversores')->group(function () {
            Route::get('/', [InversorController::class, 'index'])->name('index.inversores');
            Route::get('/detalle', [InversorController::class, 'show'])->name('show.inversores');

            // Route::get('/inversores/agregar', [InversorController::class, 'create'])->name('create.inversores');
            // Route::post('/inversores/agregar', [InversorController::class, 'store'])->name('store.inversores');
            // Route::get('/inversores/editar/{inversor}', [InversorController::class, 'edit'])->name('edit.inversores');
            // Route::post('/inversores/editar/{inversor}', [InversorController::class, 'update'])->name('update.inversores');
        });

        //INVERSIONES
        Route::prefix('inversiones')->group(function () {
            Route::get('/detalle', [InversionController::class, 'show'])->name('show.inversiones');
        });


        // VENTAS
        Route::get('/ventas', [VentaController::class, 'index'])->name('index.ventas');
        Route::get('/ventas/ver/{id}', [VentaController::class, 'show'])->name('show.ventas');

        // CAJA
        Route::get('/caja', [SesionCajaController::class, 'show'])->name('show.cajas')->middleware('checksesion');
        Route::get('/cajas', [SesionCajaController::class, 'index'])->name('index.cajas');
        Route::get('/caja-detalle/{sesionCaja}', [SesionCajaController::class, 'showDetalle'])->name('showDetalle.cajas');
        Route::get('/apertura-caja', [SesionCajaController::class, 'createApertura'])->name('create.aperturaCaja')->middleware('checksesion');
        Route::post('/apertura-caja', [SesionCajaController::class, 'storeApertura'])->name('store.aperturaCaja');
        Route::post('/cierre-caja', [SesionCajaController::class, 'storeCierre'])->name('cerrar.caja');
        Route::get('/caja/efectivo-disponible/{sesionCajaId}', [CajaMovimientoController::class, 'verEfectivoEnCaja']);

        // GASTOS
        Route::get('/gastos', [SesionCajaController::class, 'index'])->name('index.gastos');

        // MOVIMIENTOS revisado user
        Route::middleware('checksesion')->group(function () { //todos los movimientos de caja tiene que validar antes que esté en una sesion caja
            Route::get('/caja/cargar-ingreso', [CajaMovimientoController::class, 'createIngreso'])->name('create.ingresoCaja');
            Route::post('/caja/cargar-ingreso/{sesionCajaId}', [CajaMovimientoController::class, 'agregarDinero'])->name('store.ingresoCaja');
            Route::get('/caja/cargar-egreso', [CajaMovimientoController::class, 'createEgreso'])->name('create.egresoCaja');
            Route::post('/caja/cargar-egreso/{sesionCajaId}', [CajaMovimientoController::class, 'retirarDinero'])->name('store.egresoCaja');
        });

        //LECTOR revisado user
        Route::get('/lector', [LectorController::class, 'index'])->name('index.lector')->middleware('checksesion');

        // LOTES
        Route::get('/lotes/productos', [LoteController::class, 'index'])->name('index.lotes');
        Route::get('/lotes/productos/{producto}', [LoteController::class, 'show'])->name('show.lote');

        //METODOS
        Route::get('/metodos', [MetodoPagoController::class, 'index'])->name('index.metodos');
        Route::get('/metodos/agregar', [MetodoPagoController::class, 'create'])->name('create.metodos');
        Route::post('/metodos/agregar', [MetodoPagoController::class, 'store'])->name('store.metodos');
        Route::get('/metodos/editar/{id}', [MetodoPagoController::class, 'edit'])->name('edit.metodos');
        Route::post('/metodos/editar/{id}', [MetodoPagoController::class, 'update'])->name('update.metodos');

        //PROVEEDORES
        Route::get('/proveedores', [ProveedorController::class, 'index'])->name('index.proveedores');
        Route::get('/proveedores/agregar', [ProveedorController::class, 'create'])->name('create.proveedores');
        Route::post('/proveedores/agregar', [ProveedorController::class, 'store'])->name('store.proveedores');
        Route::get('/proveedores/editar/{proveedor}', [ProveedorController::class, 'edit'])->name('edit.proveedores');
        Route::post('/proveedores/editar/{proveedor}', [ProveedorController::class, 'update'])->name('update.proveedores');


        // REPORTES
        Route::get('/reportes', [ReporteController::class, 'index'])->name('index.reportes');
        // Route::get('/reportes/productos', [ReporteController::class, 'indexProductos'])->name('index.reportes');
        Route::get('/reportes/productos/costo/{id}/{anio}/{mes}', [ReporteController::class, 'showProducto'])->name('show.reportes');
        Route::get('/reportes/proveedores', [ReporteController::class, 'indexProveedores'])->name('index.reportes.proveedores');
        Route::get('/reportes/proveedores/compras/{id}', [ReporteController::class, 'showProveedorCompras'])->name('show.reportesComprasProveedores');


        //DISENIO
        Route::get('/lector-disenio', function () {
            return view('maquetado.lector');
        });

        //PRUEBA MERCADO
        Route::get('/pagos-mercadopago', function () {
            return view('mercadopago.index');
        });

    });


});


Route::get('/limpiar-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    return 'Caché limpiada correctamente';
});

require __DIR__ . '/auth.php';
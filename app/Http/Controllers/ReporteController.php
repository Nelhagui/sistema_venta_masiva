<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Producto;
use Carbon\Carbon;
use App\Models\Proveedor;
use App\Models\Compra;
use Illuminate\Pagination\Paginator;


class ReporteController extends Controller
{
    public function indexProductos()
    {
        $productos = Producto::orderBy('titulo')->paginate(50);
        return view('reportes.index', compact('productos'));
    }
    public function showProducto($id, $anio, $mes)
    {
        $producto = Producto::find($id);

        $inicio = Carbon::create($anio, $mes, 1);
        $fin = $inicio->copy()->endOfMonth();

        $fechasDelMes = [];

        while ($inicio->lte($fin)) {
            $fechasDelMes[] = $inicio->toDateString();
            $inicio->addDay();
        }

        $primerDiaMes = Carbon::createFromDate($anio, $mes, 1)->startOfDay();
        $ultimoDiaMes = Carbon::createFromDate($anio, $mes, 1)->endOfMonth()->endOfDay();

        // Obtén todas las compras del producto en el rango de fechas del mes
        $comprasDelMes = $producto->compraDetalles()
            ->whereHas('compra', function ($query) use ($primerDiaMes, $ultimoDiaMes) {
                $query->whereBetween('fecha_compra', [$primerDiaMes, $ultimoDiaMes]);
            })
            ->with(['compra.proveedor']) // Si quieres cargar también los proveedores
            ->get();

        $proveedores = [];

        // Itera sobre las compras y agrega los nombres de los proveedores al array
        foreach ($comprasDelMes as $detalleCompra) {
            $proveedor = $detalleCompra->compra->proveedor;

            // Obtiene el nombre del proveedor o establece "Sin proveedor" si no hay proveedor asociado
            $nombreProveedor = $proveedor ? $proveedor->nombre : 'Sin proveedor';

            // Añade el nombre del proveedor al array
            $proveedores[] = $nombreProveedor;
        }

        // Elimina duplicados y reindexa el array
        $proveedores = array_values(array_unique($proveedores));

        // Puedes imprimir o utilizar $comprasDelMes como necesites
        // dd($comprasDelMes[0]->compra->proveedor);


        return view('reportes.show', compact('comprasDelMes', 'fechasDelMes', 'proveedores', 'producto'));
    }

    public function indexProveedores()
    {
        $proveedores = Proveedor::orderBy('nombre')->paginate(50);
        return view('reportes.proveedores.compras.index', compact('proveedores'));
    }
    public function showProveedorCompras($id)
    {
        $compras = Compra::where('proveedor_id', $id)->orderBy('fecha_compra')->paginate(10);
        $proveedor = Proveedor::find($id);
        return view('reportes.proveedores.compras.show', compact('compras', 'proveedor'));
    }
    
}

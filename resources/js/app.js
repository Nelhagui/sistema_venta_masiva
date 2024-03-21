import './bootstrap';

import Alpine from 'alpinejs';

import MainClientes from './components/clientes/MainClientes.jsx';
import MainDetalleCliente from './components/clientes/ver/MainDetalleCliente.jsx';
import MainImportarProductos from './components/productos/importar/MainImportarProductos';
import MainLector from './components/lector/MainLector.jsx';
import MainReportes from './components/reportes/MainReportes.jsx';
import MainProductos from './components/productos/MainProductos.jsx';
import MainVentas from './components/ventas/MainVentas.jsx';
import MainCompras from './components/compras/MainCompras.jsx';
import MainInversores from './components/inversores/lista/MainInversores.jsx';
import MainProveedores from './components/proveedores/MainProveedores.jsx';
import MainStockPrecio from './components/productos/stock_precio/MainStockPrecio.jsx';
import MainCrearProductos from './components/productos/crear/MainCrearProductos.jsx';
import MainProximamente from './components/proximamente/MainProximamente.jsx';
import MainMetodosPago from './components/metodosPago/MainMetodosPago.jsx';
import MainHome from './components/home/MainHome.jsx';
import MainDetalleInversor from './components/inversores/ver/MainDetalleInversor.jsx';
import MainCajaActual from './components/cajas/caja_actual/MainCajaActual.jsx';
import CajaEgresos from './components/cajas/egresos/CajaEgresos.jsx';
import CajaIngresos from './components/cajas/ingresos/CajaIngresos.jsx';

import MainMaquetadoLector from './components/maquetado/MainMaquetadoLector.jsx';
import MainDetalleInversion from './components/inversiones/ver/MainDetalleInversion.jsx';


window.Alpine = Alpine;

Alpine.start();
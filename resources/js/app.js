import './bootstrap';

import Alpine from 'alpinejs';

import MainImportarProductos from './components/productos/importar/MainImportarProductos';
import MainLector from './components/lector/MainLector.jsx';
import MainReportes from './components/reportes/MainReportes.jsx';
import MainProductos from './components/productos/MainProductos.jsx';
import MainProductosBase from './components/productos_base/MainProductosBase.jsx';
import MainVentas from './components/ventas/MainVentas.jsx';
import MainClientes from './components/clientes/MainClientes.jsx';
import MainDetalleCliente from './components/clientes/ver/MainDetalleCliente.jsx';
import MainCompras from './components/compras/MainCompras.jsx';
import MainInversores from './components/inversores/lista/MainInversores.jsx';
import MainProveedores from './components/proveedores/reportes/MainProveedores.jsx';
import MainProductosActualizarStock from './components/productos_stock/MainProductosActualizarStock.jsx';
import MainStockPrecio from './components/productos/stock_precio/MainStockPrecio.jsx';
import MainCrearProductos from './components/productos/crear/MainCrearProductos.jsx';
import MainProximamente from './components/proximamente/MainProximamente.jsx';

window.Alpine = Alpine;

Alpine.start();
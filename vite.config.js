
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/css/dashboard.css',
            'resources/js/app.js',
            'resources/js/components/lector/MainLector.jsx',
            'resources/js/components/reportes/MainReportes.jsx',
            'resources/js/components/productos/MainProductos.jsx',
            'resources/js/components/compras/MainCompras.jsx',
            'resources/js/components/login/Login.jsx',
            'resources/js/components/clientes/MainClientes.jsx',
            'resources/js/components/metodosPago/MainMetodosPago.jsx',
            'resources/js/components/inversores/ver/MainDetalleInversor.jsx',
            'resources/js/components/home/MainHome.jsx',
            'resources/js/components/maquetado/MainMaquetadoLector.jsx',
            'resources/js/components/inversiones/ver/MainDetalleInversion.jsx',
            'resources/js/components/cajas/caja_actual/MainCajaActual.jsx',
            'resources/js/components/cajas/detalle/ResumenDetallado.jsx',
        ]),
        react(),
    ],
});



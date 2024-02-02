
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
            'resources/js/components/productos_base/MainProductosBase.jsx',
            'resources/js/components/compras/MainCompras.jsx',
            'resources/js/components/login/Login.jsx',
            'resources/js/components/clientes/MainClientes.jsx',
            'resources/js/components/productos_stock/MainProductosActualizarStock.jsx',
        ]),
        react(),
    ],
});



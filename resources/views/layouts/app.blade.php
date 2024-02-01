<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'RapidoVentas') }}</title>
    
    @vite('resources/css/app.css')
    @vite('resources/css/dashboard.css')
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/js/components/lector/MainLector.jsx')
    @vite('resources/js/components/reportes/MainReportes.jsx')
    @vite('resources/js/components/productos/MainProductos.jsx')
    @vite('resources/js/components/productos/importar/MainImportarProductos.jsx')
    @vite('resources/js/components/productos_base/MainProductosBase.jsx')
    @vite('resources/js/components/ventas/MainVentas.jsx')
    @vite('resources/js/components/clientes/MainClientes.jsx')
    @vite('resources/js/components/clientes/ver/MainDetalleCliente.jsx')
    @vite('resources/js/components/compras/MainCompras.jsx')
    @vite('resources/js/components/inversores/lista/MainInversores.jsx')
    @vite('resources/js/components/proveedores/reportes/MainProveedores.jsx')
    @vite('resources/js/components/icons/SearchIcon.jsx')
    @vite('resources/js/components/icons/VerticalDotsIcon.jsx')
    @vite('resources/js/components/productos_stock/MainProductosActualizarStock.jsx')
    @vite('resources/js/components/productos/stock_precio/MainStockPrecio.jsx')
    @vite('resources/js/components/productos/crear/MainCrearProductos.jsx')
    @vite('resources/js/components/proximamente/MainProximamente.jsx')
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen">
        @include('layouts.navigation')

        <!-- Page Heading -->
        @if (isset($header))
            <header class="bg-white dark:bg-gray-800 shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {{ $header }}
                </div>
            </header>
        @endif

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
    </div>
</body>

</html>

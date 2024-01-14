<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <style>
        /* En tu archivo de estilos CSS */
        .highlighted-row {
            background-color: rgb(131, 206, 131) !important;
            transition: background-color 0.5s ease;
        }

        .highlighted-none {
            background-color: rgba(255, 255, 255, 0);
            transition: background-color 0.5s ease;
        }
    </style>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
    <!-- Scripts -->
    @vite('resources/css/app.css')
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/js/components/lector/MainLector.jsx')
    @vite('resources/js/components/reportes/MainReportes.jsx')
    @vite('resources/js/components/productos/MainProductos.jsx')
    @vite('resources/js/components/productos_base/MainProductosBase.jsx')
    @vite('resources/js/components/compras/MainCompras.jsx')
    @vite('resources/js/components/clientes/MainClientes.jsx')
    @vite('resources/js/components/compras/IndexCompras.jsx')
    @vite('resources/js/components/icons/SearchIcon.jsx')
    @vite('resources/js/components/icons/VerticalDotsIcon.jsx')
    @vite('resources/js/components/productos_stock/MainProductosActualizarStock.jsx')
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen bg-gray-100">
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

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-T2VWG0L63T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-T2VWG0L63T');
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('public/assets/icon-shop.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('public/assets/icon-shop.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('public/assets/icon-shop.png') }}">

    <title>
        @isset($title)
            {{ $title }}
        @else
            {{ config('app.name', 'RapidoVentas') }}
        @endisset
    </title>

    @vite('resources/css/app.css')
    @vite('resources/css/dashboard.css')
    @viteReactRefresh
    @vite('resources/js/app.js')
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen">
        @include('layouts.navigation')

        <!-- Page Heading -->
        @if (isset($header))
            <header class="bg-white dark:bg-gray-800 shadow">
                {{ $header }}
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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

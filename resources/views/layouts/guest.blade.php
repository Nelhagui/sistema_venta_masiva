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
</head>

<body class="font-sans text-gray-900 antialiased">
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {{ $slot }}
        </div>
        @if (request()->is('login'))
            {{-- Tu código HTML/Blade aquí --}}
            <p class="mt-10 text-center text-sm text-gray-500">
                ¿No es un miembro?
                <a href="{{ route('register') }}"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Comience ahora GRATIS!</a>
            </p>
        @endif
    </div>
</body>

</html>

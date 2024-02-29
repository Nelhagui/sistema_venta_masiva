<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    {{-- <!-- Hotjar Tracking Code for RápidoVentas -->
    <script>
        (function(h, o, t, j, a, r) {
            h.hj = h.hj || function() {
                (h.hj.q = h.hj.q || []).push(arguments)
            };
            h._hjSettings = {
                hjid: 3867609,
                hjsv: 6
            };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script');
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    </script>
    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MVZ6HWRX');
    </script>
    <!-- End Google Tag Manager -->

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-T2VWG0L63T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-T2VWG0L63T');
    </script> --}}

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
    @vite('resources/js/utils/desplegarMenu.js')
</head>

<body class="font-sans antialiased" style="display: flex">
    @include('layouts.sidebar')

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MVZ6HWRX" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div style="display: flex; flex-direction: column; width: 100%">
        @include('layouts.navigation')

        <div class="h-contenido">

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
    </div>
    
</body>

</html>

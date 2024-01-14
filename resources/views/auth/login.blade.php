


<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    

    <!-- Scripts -->
    {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
    <!-- Scripts -->
    {{-- @vite('resources/css/app.css') --}}
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    @vite('resources/js/components/login/Login.jsx')
</head>

<body class="font-sans antialiased">
    {{-- <div class="min-h-screen bg-gray-100"> --}}

        <!-- Page Content -->
        {{-- <main> --}}
            <div id="mainLogin"></div>
        {{-- </main> --}}
    {{-- </div> --}}
</body>

</html>

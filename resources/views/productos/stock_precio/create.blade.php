<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Cargar Stock y Precio') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-auto mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
            <div id="mainStockPrecio"></div>
            </div>
        </div>
    </div>
</x-app-layout>

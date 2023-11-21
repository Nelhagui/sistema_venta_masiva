<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Productos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row justify-between mb-3">
                        <a href="{{ route('create.productos') }}" class="button-link"> Agregar producto</a>
                        <a href="{{ route('create.productosStock') }}" class="button-link"> Cargar Stock de Productos</a>
                </div>
                <div id="mainProductos"></div>
            </div>
        </div>
    </div>
</x-app-layout>

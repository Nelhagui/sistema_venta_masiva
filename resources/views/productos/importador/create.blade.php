<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Productos') }}
        </h2>
    </x-slot>

    <div class="py-4">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-2">
            <div class="flex flex-col">
                <div id="mainImportarProductos"></div>
            </div>
        </div>
    </div>
</x-app-layout>
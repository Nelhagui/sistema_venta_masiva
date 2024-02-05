<x-app-layout>
    <x-slot:title>
        Ventas
    </x-slot>
    <div class="py-4">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div id="mainVentas" data-fecha={{$fecha}}></div>
            </div>
        </div>
    </div>
</x-app-layout>
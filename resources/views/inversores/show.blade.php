<x-app-layout>
    <x-slot:title>
        Mostrar Inversor
    </x-slot>
    <div class="py-4">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div id="mainDetalleInversor" data-inversor-id={{$id}}>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
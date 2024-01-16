<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Crear Proveedor') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.proveedores') }}" class="button-link"> Ver lista de Proveedores</a>
                </div>
                <form action="{{route('store.proveedores')}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required><br>

                    <label for="telefono">Dirección</label><br>
                    <input type="text" name="direccion"><br>

                    <label for="telefono">Teléfono</label><br>
                    <input type="number" name="telefono"><br>

                    <label for="whatsapp">Whatsapp</label><br>
                    <input type="number" name='whatsapp'><br>

                    <label for="nota">Nota</label><br>
                    <input type="text" name='nota'><br>

                    <button type="submit" class="button">Guardar Proveedor</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
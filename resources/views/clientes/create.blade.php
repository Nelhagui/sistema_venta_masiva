<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Crear Clientes') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.clientes') }}" class="button-link"> Ver lista de Clientes</a>
                </div>
                <form action="{{route('store.clientes')}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required><br>

                    <label for="telefono">Teléfono</label><br>
                    <input type="number" name="telefono" required><br>

                    <label for="whatsapp">Whatsapp</label><br>
                    <input type="number" name='whatsapp' required><br>

                    <label for="nota">Nota</label><br>
                    <input type="text" name='nota'><br>

                    <button type="submit">Guardar cliente</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
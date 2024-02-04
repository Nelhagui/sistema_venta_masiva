<x-app-layout>
    <x-slot:title>
        Crear Inversor
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.inversores') }}" class="button-link"> Ver lista de Inversores</a>
                </div>
                <form action="{{route('store.inversores')}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required><br>

                    <label for="apellido">Apellido</label><br>
                    <input type="text" name="apellido"><br>

                    <button type="submit" class="button">Guardar Inversor</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
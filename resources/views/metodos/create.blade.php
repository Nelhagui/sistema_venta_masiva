<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Agregar Método de pago') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.metodos') }}" class="button-link"> Ver lista</a>
                </div>
                <form action="{{route('store.metodos')}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required value={{old('nombre')}}><br>
                    @error('nombre')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="comision">Comisión</label><br>
                    <input type="number" name="comision" required value={{old('comision')}}><br>
                    @error('comision')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <button type="submit">Guardar método de pago</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
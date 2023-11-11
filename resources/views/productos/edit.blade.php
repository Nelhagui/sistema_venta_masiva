<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Editar Productos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.productos') }}" class="button-link"> Ver lista de productos</a>
                </div>
                <form action="{{route('update.productos', $producto->id)}}" method="POST">
                    @csrf
                    <label for="titulo">Titulo</label><br>
                    <input type="text" name="titulo" required value={{$producto->titulo}}><br>
                    @error('titulo')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="precio_costo">Precio costo</label><br>
                    <input type="number" name="precio_costo" required value={{$producto->precio_costo}}><br>
                    @error('precio_costo')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="precio_venta">Precio venta</label><br>
                    <input type="number" name='precio_venta' required value={{$producto->precio_venta}}><br>
                    @error('precio_venta')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="stock">Stock</label><br>
                    <input type="number" name='stock' required value={{$producto->stock}}><br>
                    @error('stock')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="codigo_barra">Codigo de barra</label><br>
                    <input type="text" name='codigo_barra' value={{$producto->codigo_barra}}><br>
                    @error('codigo_barra')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <button type="submit">Editar producto</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
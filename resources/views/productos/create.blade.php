<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Crear Productos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row justify-between">
                    <div>
                        <a href="{{ route('index.productos') }}" class="button-link">Ver lista de productos</a>
                    </div>
                    <div>
                        <a href="{{route('index.productosBase')}}">Agregar producto desde "lista de productos base"</a>
                    </div>
                </div>
                <form action="{{route('store.productos')}}" method="POST">
                    @csrf
                    <label for="titulo">Titulo</label><br>
                    <input type="text" name="titulo" required value={{old('titulo')}}><br>
                    @error('titulo')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="precio_costo">Precio costo</label><br>
                    <input type="number" name="precio_costo" required value={{old('precio_costo')}}><br>
                    @error('precio_costo')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="precio_venta">Precio venta</label><br>
                    <input type="number" name='precio_venta' required value={{old('precio_venta')}}><br>
                    @error('precio_venta')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="stock">Stock</label><br>
                    <input type="number" name='stock' required value={{old('stock')}}><br>
                    @error('stock')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <label for="codigo_barra">Codigo de barra</label><br>
                    <input type="text" name='codigo_barra' required value={{old('codigo_barra')}}><br>
                    @error('codigo_barra')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror

                    <button type="submit">Guardar producto</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
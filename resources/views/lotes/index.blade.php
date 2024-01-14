<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Productos con Lote') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('create.productos') }}" class="button-link"> Agregar Producto con Lote</a>
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Id </th>
                            <th class="text-left p-2 border border-slate-600">Nombre</th>
                            <th class="text-left p-2 border border-slate-600">Stock</th>
                            <th class="text-left p-2 border border-slate-600">Precio Costo</th>
                            <th class="text-left p-2 border border-slate-600">Precio Venta</th>
                            <th class="text-left p-2 border border-slate-600">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($productos as $producto)
                            <tr>
                                <td class="p-2 border border-slate-600">{{$producto->id }}</td>
                                <td class="p-2 border border-slate-600">{{$producto->titulo }}</td>
                                <td class="p-2 border border-slate-600">{{$producto->stock_actual }}</td>
                                <td class="p-2 border border-slate-600">${{$producto->precio_costo }}</td>
                                <td class="p-2 border border-slate-600">${{$producto->precio_venta }}</td>
                                <td class="p-2 border border-slate-600"><a href='{{route('show.lote', $producto->id)}}'>Ver</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
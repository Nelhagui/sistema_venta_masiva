<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Ventas') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    {{-- <a href="{{ route('create.clientes') }}" class="button-link"> Agregar Cliente</a> --}}
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Producto</th>
                            <th class="text-left p-2 border border-slate-600">Cantidad</th>
                            <th class="text-left p-2 border border-slate-600">Precio</th>
                            <th class="text-left p-2 border border-slate-600">Costo</th>
                            <th class="text-left p-2 border border-slate-600">Total Precio</th>
                            <th class="text-left p-2 border border-slate-600">Total Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($venta->detalles as $detalle)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $detalle->producto->titulo }}</td>
                                <td class="p-2 border border-slate-600">{{ $detalle->cantidad }}</td>
                                <td class="p-2 border border-slate-600">${{ $detalle->precio_unitario }}</td>
                                <td class="p-2 border border-slate-600">${{ $detalle->costo_unitario }}</td>
                                <td class="p-2 border border-slate-600">${{ $detalle->precio_unitario*$detalle->cantidad }}</td>
                                <td class="p-2 border border-slate-600">${{ $detalle->costo_unitario*$detalle->cantidad }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
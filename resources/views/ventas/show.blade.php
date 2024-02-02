<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
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
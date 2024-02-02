<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.lotes') }}" class="button-link"> Volver</a>
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Id </th>
                            <th class="text-left p-2 border border-slate-600">Nombre</th>
                            <th class="text-left p-2 border border-slate-600">Proveedor</th>
                            <th class="text-left p-2 border border-slate-600">Inversor</th>
                            <th class="text-left p-2 border border-slate-600">Precio Costo</th>
                            <th class="text-left p-2 border border-slate-600">Precio Venta</th>
                            <th class="text-left p-2 border border-slate-600">Cant. Inicial</th>
                            <th class="text-left p-2 border border-slate-600">Cant. Restante</th>
                            <th class="text-left p-2 border border-slate-600">Fecha Compra</th>
                            <th class="text-left p-2 border border-slate-600">N° Factura</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($lotes as $lote)
                            <tr>
                                <td class="p-2 border border-slate-600">{{$lote->id }}</td>
                                <td class="p-2 border border-slate-600">{{$lote->producto->titulo }}</td>
                                <td class="p-2 border border-slate-600">
                                    {{ optional($lote->proveedor)->nombre }} {{ optional($lote->proveedor)->apellido }}
                                </td>
                                <td class="p-2 border border-slate-600">
                                    {{ optional($lote->inversorProductos->first())->inversor->nombre }} {{ optional($lote->inversorProductos->first())->inversor->apellido }}
                                </td>
                                <td class="p-2 border border-slate-600">${{$lote->precio_costo }}</td>
                                <td class="p-2 border border-slate-600">${{$lote->precio_venta }}</td>
                                <td class="p-2 border border-slate-600">{{$lote->cantidad_inicial }}</td>
                                <td class="p-2 border border-slate-600">{{$lote->cantidad_restante }}</td>
                                <td class="p-2 border border-slate-600">{{$lote->fecha_compra }}</td>
                                <td class="p-2 border border-slate-600">{{$lote->numero_factura }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Compras') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div>
                    <h2 class="font-semibold text-xl leading-tight">Datos de la compra</h2>
                    <p>Proveedor: {{$compra->proveedor->nombre}}</p>
                    <p>Fecha de Compra: {{$compra->fecha_compra}}</p>
                    <p>Fecha de Carga en el sistema: {{$compra->fecha_carga}}</p>
                    <p>Nro Factura: {{$compra->numero_factura}}</p>
                </div>

                <h2 class="font-semibold text-xl leading-tight mt-3">Detalle de la compra</h2>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Producto</th>
                            <th class="text-left p-2 border border-slate-600">Cantidad</th>
                            <th class="text-left p-2 border border-slate-600">Precio Unitario</th>
                            <th class="text-left p-2 border border-slate-600">Total Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($compra->detalles as $detalle)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $detalle->producto->titulo }}</td>
                                <td class="p-2 border border-slate-600">{{ $detalle->cantidad }}</td>
                                <td class="p-2 border border-slate-600">${{ $detalle->precio_unitario }}</td>
                                <td class="p-2 border border-slate-600">${{ $detalle->precio_total }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
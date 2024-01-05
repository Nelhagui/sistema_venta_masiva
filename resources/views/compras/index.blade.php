<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Compras') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row justify-between mb-3">
                        <a href="{{ route('create.compras') }}" class="button-link"> Cargar compra</a>
                </div>
                <table className="table-auto ">
                    <thead>
                        <tr>
                            <th className="p-2 border border-slate-600" style="text-align: start">ID</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Proveedor</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Precio Total</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Fecha de Compra</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Fecha de Carga</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Nro Factura</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($compras as $compra)
                            <tr key={producto.id}>
                                <td className="p-2 border border-slate-700">{{ $compra->id }}</td>
                                <td className="p-2 border border-slate-700">{{ $compra->proveedor !== null ? $compra->proveedor->nombre : ""}}</td>
                                <td className="p-2 border border-slate-700">{{ $compra->precio_total }} </td>
                                <td className="p-2 border border-slate-700">{{ $compra->fecha_compra }} </td>
                                <td className="p-2 border border-slate-700">{{ $compra->fecha_carga }} </td>
                                <td className="p-2 border border-slate-700">{{ $compra->numero_factura }} </td>
                                <td className="p-2 border border-slate-700"> 
                                    <a href={{ route('show.compras', $compra->id) }}>Ver</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            {{ $compras->links() }}
        </div>
    </div>
</x-app-layout>

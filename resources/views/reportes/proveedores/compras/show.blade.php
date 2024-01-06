<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Compras') }}
        </h2>
    </x-slot>
    <style>
        .title-section {
            font-size: 1.8em;
            margin-bottom: 1rem;
        }
    </style>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="title-section">
                <h1 style="font-size: 44">{{ $proveedor->nombre }}</h1>
            </div>
            <div class="bg-gray-100 flex flex-col">
                <table className="table-auto ">
                    <thead>
                        <tr>
                            <th className="p-2 border border-slate-600" style="text-align: start">ID</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Fecha</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Total</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Factura</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($compras as $compra)
                            <tr key={producto.id}>
                                <td className="p-2 border border-slate-700">{{ $compra->id }}</td>
                                <td className="p-2 border border-slate-700">{{ $compra->fecha_compra }} </td>
                                <td className="p-2 border border-slate-700">{{ $compra->precio_total }} </td>
                                <td className="p-2 border border-slate-700">{{ $compra->numero_factura }} </td>
                                <td className="p-2 border border-slate-700"> 
                                    <a href={{ route('show.reportesComprasProveedores', ['id' => $compra->id]) }}>Ver</a>
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

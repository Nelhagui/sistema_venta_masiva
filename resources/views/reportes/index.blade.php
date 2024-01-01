<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Productos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <table className="table-auto ">
                    <thead>
                        <tr>
                            <th className="text-left p-2 border border-slate-600">ID</th>
                            <th className="text-left p-2 border border-slate-600">Nombre</th>
                            <th className="text-left p-2 border border-slate-600">Precio Costo</th>
                            <th className="text-left p-2 border border-slate-600">Precio Venta</th>
                            <th className="text-left p-2 border border-slate-600">Stock</th>
                            <th className="text-left p-2 border border-slate-600">Código Barra</th>
                            <th className="text-left p-2 border border-slate-600">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($productos as $producto)
                            <tr key={producto.id}>
                                <td className="p-2 border border-slate-700">{{ $producto->id }}</td>
                                <td className="p-2 border border-slate-700">{{ $producto->titulo }} </td>
                                <td className="p-2 border border-slate-700">{{ $producto->precio_costo }}</td>
                                <td className="p-2 border border-slate-700">{{ $producto->precio_venta }}</td>
                                <td className="p-2 border border-slate-700">{{ $producto->stock_actual }}</td>
                                <td className="p-2 border border-slate-700">{{ $producto->codigo_barra }}</td>
                                <td className="p-2 border border-slate-700"> <a
                                        href={{ route('show.reportes', ['id' => $producto->id, 'anio' => date('Y'), 'mes' => date('m')]) }}>Ver</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            {{ $productos->links() }}
        </div>
    </div>
</x-app-layout>

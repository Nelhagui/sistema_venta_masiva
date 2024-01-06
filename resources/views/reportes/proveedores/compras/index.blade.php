<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Proveedores (Reportes)') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <table className="table-auto ">
                    <thead>
                        <tr>
                            <th className="p-2 border border-slate-600" style="text-align: start">ID</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Nombre</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Dirección</th>
                            <th className="p-2 border border-slate-600" style="text-align: start">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($proveedores as $proveedor)
                            <tr key={producto.id}>
                                <td className="p-2 border border-slate-700">{{ $proveedor->id }}</td>
                                <td className="p-2 border border-slate-700">{{ $proveedor->nombre }} </td>
                                <td className="p-2 border border-slate-700">{{ $proveedor->direccion }} </td>
                                <td className="p-2 border border-slate-700"> 
                                    <a href={{ route('show.reportesComprasProveedores', ['id' => $proveedor->id]) }}>Ver</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            {{ $proveedores->links() }}
        </div>
    </div>
</x-app-layout>

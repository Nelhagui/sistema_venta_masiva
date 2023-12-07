<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Proveedores') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('create.proveedores') }}" class="button-link"> Agregar Proveedor</a>
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Nombre</th>
                            <th class="text-left p-2 border border-slate-600">Dirección</th>
                            <th class="text-left p-2 border border-slate-600">Teléfono</th>
                            <th class="text-left p-2 border border-slate-600">Whatsapp</th>
                            <th class="text-left p-2 border border-slate-600">Nota</th>
                            <th class="text-left p-2 border border-slate-600">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($proveedores as $proveedor)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $proveedor->nombre }}</td>
                                <td class="p-2 border border-slate-600">{{ $proveedor->direccion }}</td>
                                <td class="p-2 border border-slate-600">{{ $proveedor->telefono }}</td>
                                <td class="p-2 border border-slate-600">{{ $proveedor->whatsapp }}</td>
                                <td class="p-2 border border-slate-600">{{ $proveedor->nota }}</td>
                                <td class="p-2 border border-slate-600"><a href='{{ route('edit.proveedores', $proveedor->id) }}'>Editar</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
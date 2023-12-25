<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Inversores') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('create.inversores') }}" class="button-link"> Agregar Inversor</a>
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Nombre</th>
                            <th class="text-left p-2 border border-slate-600">Apellido</th>
                            <th class="text-left p-2 border border-slate-600">Estado</th>
                            <th class="text-left p-2 border border-slate-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($inversores as $inversor)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $inversor->nombre }}</td>
                                <td class="p-2 border border-slate-600">{{ $inversor->apellido }}</td>
                                <td class="p-2 border border-slate-600">
                                    @if ($inversor->estado == 1)
                                        Activo
                                        @elseif ($inversor->estado == 0)
                                        Inactivo
                                        @else
                                        Sin Estado
                                    @endif
                                </td>
                                <td class="p-2 border border-slate-600"><a href='{{ route('edit.inversores', $inversor->id) }}'>Editar</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
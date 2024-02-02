<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Métodos de pago') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('create.metodos') }}" class="button-link"> Agregar Método de pago</a>
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">Nombre</th>
                            <!-- <th class="text-left p-2 border border-slate-600">Comisión</th> -->
                            <th class="text-left p-2 border border-slate-600">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($metodos as $metodo)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $metodo->nombre }}</td>
                                <!-- <td class="p-2 border border-slate-600">{{ $metodo->comision }}</td> -->
                                <td class="p-2 border border-slate-600"><a href='{{route('edit.metodos', $metodo->id)}}'>Editar</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
<x-app-layout >
    <x-slot name="header">
        <div class="flex flex-row justify-between">
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ __('Egreso de caja') }}
            </h2>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-red-200 p-5 rounded">
            <div class="flex flex-col">
                <div class="flex flew-row justify-between">
                    <div class="flex items-center">
                        <div class="text-center">
                            <p>Efectivo en Caja</p>
                            <p class="text-4xl">${{$ultimaSesion->monto_actual}}</p>
                        </div>
                    </div>
                </div>
                <div class="mt-3 max-w-2xl w-auto">
                    <form action="{{route('store.egresoCaja', $ultimaSesion->id)}}" method="POST">
                        @csrf
                        <div class="flex flex-col mb-5 w-52">
                            <label for="">Monto Total a Retirar</label>
                            <input type="number" name="monto" step="0.01" required>
                        </div>
                        <div class="flex flex-col mb-5">
                            <label for="">Descripción Motivo Egreso</label>
                            <input type="text" name="descripcion">
                        </div>
                        <div>
                            <button type="submit" class="bg-gray-300 hover:bg-gray-400 hover:text-white px-3 py-2 rounded">Guardar Retiro</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="flex items-center mt-6 flex-col">
            <div class="my-2 text-left">
                <p class="text-left">Últimos {{$ultimosEgresos->count()}} registros:</p>
            </div>
            <table class="table-auto border-collapse border border-slate-500" style="width: auto">
                <thead>
                    <tr>
                        <th class="text-left p-2 border border-slate-600">ID</th>
                        <th class="text-left p-2 border border-slate-600">Caja iniciada por</th>
                        <th class="text-left p-2 border border-slate-600">Usuario Identificado</th>
                        <th class="text-left p-2 border border-slate-600">Monto Retirado</th>
                        <th class="text-left p-2 border border-slate-600">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($ultimosEgresos as $egreso)
                        <tr>
                            <td class="p-2 border border-slate-600">{{ $egreso->id }}</td>
                            <td class="p-2 border border-slate-600">{{ $egreso->sesionCaja->cajero->nombre }}</td>
                            <td class="p-2 border border-slate-600">{{ $egreso->user->nombre }}</td>
                            <td class="p-2 border border-slate-600">${{ $egreso->monto }}</td>
                            <td class="p-2 border border-slate-600">{{ $egreso->descripcion }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
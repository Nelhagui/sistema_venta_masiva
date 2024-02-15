<x-app-layout>
    <x-slot:title>
        Ingreso Caja
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-emerald-200 p-4 rounded">
            <div class="flex flex-col">
                <div class="flex flew-row justify-between">
                    <div class="flex items-center">
                        <div class="text-center">
                            <p>Efectivo en Caja</p>
                            <p class="text-4xl">${{$total}}</p>
                        </div>
                    </div>
                </div>
                <div class="mt-3 max-w-2xl w-auto">
                    <form action="{{route('store.ingresoCaja', $ultimaSesion->id)}}" method="POST">
                        @csrf
                        <div class="flex flex-col mb-5 w-52">
                            <label for="">Monto Total a Ingresar</label>
                            <input type="number" name="monto" step="0.01" required>
                        </div>
                        <div class="flex flex-col mb-5">
                            <label for="">Descripción Motivo ingreso</label>
                            <input type="text" name="descripcion">
                        </div>
                        <div>
                            <button type="submit" class="bg-gray-300 hover:bg-gray-400 hover:text-white px-3 py-2 rounded">Cargar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        <div class="flex items-center mt-6 flex-col">
            <div class="my-2 text-left">
                <p class="text-left">Últimos {{$ultimosIngresos->count()}} registros:</p>
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
                    @foreach($ultimosIngresos as $ingreso)
                        <tr>
                            <td class="p-2 border border-slate-600">{{ $ingreso->id }}</td>
                            <td class="p-2 border border-slate-600">{{ $ingreso->sesionCaja->cajero->nombre }}</td>
                            <td class="p-2 border border-slate-600">{{ $ingreso->user->nombre }}</td>
                            <td class="p-2 border border-slate-600">${{ $ingreso->monto }}</td>
                            <td class="p-2 border border-slate-600">{{ $ingreso->descripcion }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
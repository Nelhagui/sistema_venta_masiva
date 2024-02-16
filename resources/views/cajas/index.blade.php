<x-app-layout>
    <x-slot:title>
        Historial Cajas
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">ID</th>
                            <th class="text-left p-2 border border-slate-600">Cajero</th>
                            <th class="text-left p-2 border border-slate-600">Apertura</th>
                            <th class="text-left p-2 border border-slate-600">Cierre</th>
                            <th class="text-left p-2 border border-slate-600">Ventas</th>
                            <th class="text-left p-2 border border-slate-600">Total</th>
                            <th class="text-left p-2 border border-slate-600">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($sesiones as $sesion)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $sesion->id }}</td>
                                <td class="p-2 border border-slate-600">{{ $sesion->cajero->nombre }}</td>
                                <td class="p-2 border border-slate-600">{{ \Carbon\Carbon::parse($sesion->fecha_hora_apertura)->format('d/m/Y') }}, {{ \Carbon\Carbon::parse($sesion->fecha_hora_apertura)->format('H:i') }}</td>
                                <td class="p-2 border border-slate-600">
                                    @if($sesion->fecha_hora_cierre)
                                        {{ \Carbon\Carbon::parse($sesion->fecha_hora_cierre)->format('d/m/Y') }}, {{ \Carbon\Carbon::parse($sesion->fecha_hora_cierre)->format('H:i') }}
                                    @else
                                        -
                                    @endif
                                </td>
                                <td class="p-2 border border-slate-600">{{ $sesion->ventas->count() }}</td>
                                <td class="p-2 border border-slate-600">${{ $sesion->ventas->sum('monto_total_venta') }}</td>
                                <td class="p-2 border border-slate-600"><a href='{{route('showDetalle.cajas', $sesion->id)}}'>detalle</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="mt-2">
                {{ $sesiones->links() }}
            </div>
        </div>
    </div>
</x-app-layout>
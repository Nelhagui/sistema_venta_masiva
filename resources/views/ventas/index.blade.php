<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Ventas') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row">
                    {{-- <a href="{{ route('create.clientes') }}" class="button-link"> Agregar Cliente</a> --}}
                </div>
                <table class="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th class="text-left p-2 border border-slate-600">ID</th>
                            <th class="text-left p-2 border border-slate-600">Fecha</th>
                            <th class="text-left p-2 border border-slate-600">Hora</th>
                            <th class="text-left p-2 border border-slate-600">Total</th>
                            <th class="text-left p-2 border border-slate-600">Cajero</th>
                            <th class="text-left p-2 border border-slate-600">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($ventas as $venta)
                            <tr>
                                <td class="p-2 border border-slate-600">{{ $venta->id }}</td>
                                <td class="p-2 border border-slate-600">{{ \Carbon\Carbon::parse($venta->created_at)->format('d/m/Y') }}</td>
                                <td class="p-2 border border-slate-600">{{ \Carbon\Carbon::parse($venta->created_at)->format('H:i') }}</td>
                                <td class="p-2 border border-slate-600">${{ $venta->monto_total }}</td>
                                <td class="p-2 border border-slate-600">{{ $venta->user->nombre }}</td>
                                <td class="p-2 border border-slate-600"><a href='{{route('show.ventas', $venta->id)}}'>detalle</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="mt-2">
                {{ $ventas->links() }}
            </div>
        </div>
    </div>
</x-app-layout>
<x-app-layout>
    <x-slot:title>
        Detalle Caja Hoy
    </x-slot>
    <x-slot name="header">
        <div class="flex flex-row justify-between">
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ __('Detalle de Caja') }}
            </h2>
            <div class="dark:text-gray-200">
                <a href="{{route('index.cajas')}}" class="bg-gray-100 text-gray-800 p-2 rounded">Historial</a>
            </div>

        </div>
    </x-slot>

    <div class="py-12">
        <div class="flex max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="px-3 p-2 rounded-lg border bg-white" style="margin-left: 0.5rem">
                <p class="text-xl py-1" style="font-weight: bold">Caja</p>
                <table>
                    <tr>
                        <td style="padding-right: 1rem">Cajero</td>
                        <td>{{$sesionCaja->cajero->nombre}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Apertura</td>
                        <td>{{$sesionCaja->fecha_hora_apertura}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Cierre</td>
                        <td>{{$sesionCaja->fecha_hora_cierre}}</td>
                    </tr>
                </table>
            </div>
            <div class="px-3 p-2 rounded-lg border bg-white" style="margin-left: 0.5rem">
                <p class="text-xl py-1" style="font-weight: bold">Montos</p>
                <table>
                    <tr>
                        <td style="padding-right: 1rem">En Apertura</td>
                        <td>${{$sesionCaja->monto_inicial}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Al cierre</td>
                        <td>${{$sesionCaja->monto_final}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Total</td>
                        <td>${{$sesionCaja->monto_actual}}</td>
                    </tr>
                </table>
            </div>
            <div class="px-3 p-2 rounded-lg border bg-white" style="margin-left: 0.5rem">
                <p class="text-xl py-1" style="font-weight: bold">Ventas</p>
                <table>
                    <tr>
                        <td style="padding-right: 1rem">Cantidad</td>
                        <td>{{$sesionCaja->ventas->count()}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Total</td>
                        <td>${{$sesionCaja->ventas->sum('monto_total')}}</td>
                    </tr>
                </table>
            </div>
            <div class="px-3 p-2 rounded-lg border bg-white" style="margin-left: 0.5rem">
                <p class="text-xl py-1" style="font-weight: bold">Métodos</p>
                <table>
                    <tr>
                        <td style="padding-right: 1rem">En Efectivo</td>
                        <td>${{$sesionCaja->monto_inicial}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Mercado Pago</td>
                        <td>${{$sesionCaja->monto_final}}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Total</td>
                        <td>${{$sesionCaja->monto_actual}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
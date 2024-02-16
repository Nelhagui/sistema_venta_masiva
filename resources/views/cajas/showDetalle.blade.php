<x-app-layout>
    <x-slot:title>
        Detalle Caja
    </x-slot>
    <div class="py-12">
        <div class="flex justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="flex flex-col">
                <div class="flex flex-col gap-10">
                    <div class="flex items-center">
                        <div>
                            <h1 class="text-4xl">Detalle de Caja</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-6 items-baseline">
                <div class="dark:text-gray-500">
                    <a href="{{ route('index.cajas') }}" class="bg-gray-300 text-gray-800 p-2 rounded">Historial</a>
                </div>
            </div>
        </div>
    </div>

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
                        <td style="padding-right: 1rem">Total</td>
                        <td>$</td>
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
                        <td>$-----</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 1rem">Total</td>
                        <td>$</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
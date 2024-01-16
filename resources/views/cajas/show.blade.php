<x-app-layout>
    <x-slot name="header">
        <div class="flex flex-row justify-between">
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ __('Caja actual') }}
            </h2>
            <div class="dark:text-gray-200">
                <a href="{{route('index.cajas')}}" class="bg-gray-100 text-gray-800 p-2 rounded">Historial</a>
            </div>

        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flew-row justify-between">
                    <div class="flex items-center">
                        <div>
                            <p class="text-4xl">${{$ultimaSesion->monto_actual}}</p>
                            <p>Efectivo de apertura: ${{$ultimaSesion->monto_inicial}}</p>
                        </div>
                        <div class="ml-4 gap-4">
                            <a href="{{route('create.ingresoCaja')}}" class="hover:bg-gray-500 bg-gray-600 text-gray-200 px-3 py-1 cursor-pointer rounded">Ingresar</a>
                            <a href="{{route('create.egresoCaja')}}" class="hover:bg-gray-500 bg-gray-600 text-gray-200 px-3 py-1 cursor-pointer rounded">Retirar</a>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
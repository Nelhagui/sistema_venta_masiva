<x-app-layout>
    <x-slot:title>
        Mostrar Caja
    </x-slot>
    <div class="py-12">
        <div class="flex justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">
            
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
            <div class="flex">
                <div class="dark:text-gray-500">
                    <a href="{{route('index.cajas')}}" class="bg-gray-300 text-gray-800 p-2 rounded">Historial</a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
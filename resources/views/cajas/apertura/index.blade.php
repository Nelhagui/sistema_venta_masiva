<x-app-layout>
    <x-slot name="header">
        <div class="flex flex-row justify-between">
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ __('Apertura de caja') }}
            </h2>
            <div class="dark:text-gray-200">
                <a href="{{route('index.cajas')}}" class="bg-gray-100 text-gray-800 p-2 rounded">Historial</a>
            </div>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-red-200 p-5 rounded">
            <div class="flex flex-col">
                <div class="flex flew-row justify-between">
                    <div class="flex items-center text-center">
                        <p class="text-xl text-center">Debes realizar la apertura de caja antes de vender</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center w-100 mt-3 max-w-2xl">
            <form action="{{ route('store.aperturaCaja') }}" method="POST">
                @csrf
                <div class="flex items-center ">
                    <div class="flex flex-col mb-5 w-52">
                        <label for="">Efectivo en caja al iniciar</label>
                        <input type="number" name="monto" step="0.01" required>
                        @error('monto')
                            <p class="text-red-500">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="ml-3">
                        <button type="submit" class="bg-gray-300 hover:bg-gray-400 hover:text-white px-3 py-2 rounded">
                            Abrir Caja
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>

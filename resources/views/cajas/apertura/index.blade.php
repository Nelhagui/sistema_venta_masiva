<x-app-layout>
    <x-slot:title>
        Apertura Caja
    </x-slot>
    <div class="py-6">
        <div class="flex justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="flex flex-col">
                <div class="flex flex-col gap-10">
                    <div class="flex items-center">
                        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            {{ __('Apertura de caja') }}
                        </h2>
                    </div>
                </div>
            </div>
            <div class="flex gap-6">
                <div class="dark:text-gray-500">
                    <a href="{{ route('index.cajas') }}" class="bg-gray-300 text-gray-800 p-2 rounded">Historial</a>
                </div>
            </div>
        </div>
    </div>

    <div class="py-6">
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
                <div class="flex items-end">
                    <div class="sm:col-span-3">
                        <label for="monto" class="block text-sm font-medium leading-6 text-gray-900">Efectivo en
                            caja al iniciar</label>
                        <div class="mt-2">
                            <input type="number" name="monto" id="monto" step="0.01"
                                value="{{ old('monto') }}" autofocus required
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            @error('monto')
                                <p class="text-red-500">{{ $message }}</p>
                            @enderror
                        </div>
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

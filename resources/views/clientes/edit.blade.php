<x-app-layout>
    <x-slot:title>
        Editar Cliente
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.clientes') }}" class="button-link"> Ver lista de Clientes</a>
                </div>
                <form action="{{route('update.clientes', $cliente->id)}}" method="POST">
                    @csrf
                    <div class="my-3">
                        <label for="nombre">Nombre</label><br>
                        <div style="width: 280px">
                            <input type="text" name="nombre" required value="{{ $cliente->nombre }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('nombre')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <label for="telefono">Teléfono</label><br>
                        <div style="width: 280px">
                            <input type="text" name="telefono" required value="{{ $cliente->telefono }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('telefono')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <label for="whatsapp">Whatsapp</label><br>
                        <div style="width: 280px">
                            <input type="text" name="whatsapp" required value="{{ $cliente->whatsapp }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('whatsapp')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <div style="width: 280px">
                            <label for="nota">Nota</label><br>
                            <textarea name="nota" class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >{{ $cliente->nota }}
                            </textarea>
                            
                            @error('nota')
                                <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <x-primary-button>
                        Editar cliente
                    </x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
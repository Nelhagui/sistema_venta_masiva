<x-app-layout>
    <x-slot:title>
        Editar Proveedor
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <form action="{{route('update.proveedores', $proveedor->id)}}" method="POST">
                    @csrf
                    <div class="my-3">
                        <label for="nombre">Nombre</label><br>
                        <div style="width: 280px">
                            <input type="text" name="nombre" required value="{{ $proveedor->nombre }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('nombre')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <label for="direccion">Dirección</label><br>
                        <div style="width: 280px">
                            <input type="text" name="direccion" value="{{ $proveedor->direccion }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('direccion')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <label for="telefono">Teléfono</label><br>
                        <div style="width: 280px">
                            <input type="text" name="telefono" value="{{ $proveedor->telefono }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('telefono')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <label for="whatsapp">Whatsapp</label><br>
                        <div style="width: 280px">
                            <input type="text" name="whatsapp" value="{{ $proveedor->whatsapp }}"
                                class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        @error('whatsapp')
                            <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="my-3">
                        <div style="width: 280px">
                            <label for="nota">Nota</label><br>
                            <textarea name="nota" class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >{{ $proveedor->nota }}
                            </textarea>
                            
                            @error('nota')
                                <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <x-primary-button>
                        Guardar Cambios
                    </x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
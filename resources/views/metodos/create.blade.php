<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <!-- <div class="flex flex-row">
                    <a href="{{ route('index.metodos') }}" class="button-link"> Volver al Listado</a>
                </div> -->
                <form action="{{route('store.metodos')}}" method="POST">
                    @csrf
                   <div>
                        <div>
                            <label for="text" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                            <div class="mt-2" style="width: 300px">
                                <input type="text" name="nombre" autocomplete="false" value="{{old('nombre')}}" autofocus
                                    class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                @error('nombre')
                                    <div class="alert alert-danger">{{ $message }}</div>
                                @enderror    
                            </div>
                        </div>
                    </div>

                    <x-primary-button class="mt-3">
                        Guardar método
                    </x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
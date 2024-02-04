<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.metodos') }}" class="button-link"> Volver al Listado</a>
                </div>
                <form action="{{route('update.metodos', $metodo->id)}}" method="POST">
                    @csrf
                    <div class="my-3">
                        <label for="nombre">Nombre</label><br>
                        <div style="width: 280px">
                            <input type="text" name="nombre" required value="{{$metodo->nombre}}"
                            class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        @error('nombre')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>
                   


                    <x-primary-button>
                        Editar método de pago
                    </x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
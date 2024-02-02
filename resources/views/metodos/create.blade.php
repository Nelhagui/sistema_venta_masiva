<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.metodos') }}" class="button-link"> Ver lista</a>
                </div>
                <form action="{{route('store.metodos')}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required value={{old('nombre')}}><br>
                    @error('nombre')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror


                    <button type="submit">Guardar método de pago</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
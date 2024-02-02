<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.clientes') }}" class="button-link"> Ver lista de Clientes</a>
                </div>
                <form action="{{route('update.clientes', $cliente->id)}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required value="{{$cliente->nombre}}"><br>

                    <label for="telefono">Teléfono</label><br>
                    <input type="number" name="telefono" required value="{{$cliente->telefono}}"><br>

                    <label for="whatsapp">Whatsapp</label><br>
                    <input type="number" name='whatsapp' required value="{{$cliente->whatsapp}}"><br>

                    <label for="nota">Nota</label><br>
                    <input type="text" name='nota' value="{{$cliente->nota}}"><br>

                    <button type="submit">Editar cliente</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
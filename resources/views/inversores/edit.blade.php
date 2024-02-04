<x-app-layout>
    <x-slot:title>
        Editar Inversor
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <a href="{{ route('index.inversores') }}" class="button-link"> Ver lista de Inversores</a>
                </div>
                <form action="{{route('update.inversores', $inversor->id)}}" method="POST">
                    @csrf
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" required value="{{$inversor->nombre}}"><br>

                    <label for="apellido">Apellido</label><br>
                    <input type="text" name="apellido" required value="{{$inversor->apellido}}"><br>

                   
                    <label for="estado">Estado</label><br>
                    <input type="checkbox" name="estado" @if($inversor->estado == 1) checked @endif><br>


                    <button type="submit">Editar inversor</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
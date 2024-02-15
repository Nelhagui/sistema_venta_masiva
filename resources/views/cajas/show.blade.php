<x-app-layout>
    <x-slot:title>
        Mostrar Caja
    </x-slot>
    <div class="py-12">
        <div class="flex justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="flex flex-col">
                <div class="flex flex-col gap-10">
                    <div class="flex items-center">
                        <div>
                            <p class="text-4xl">${{ formatearAMoneda($total) }}</p>
                            <p>Efectivo de apertura: ${{ $ultimaSesion->monto_inicial }}</p>
                        </div>
                        <div class="ml-4 gap-4">
                            <a href="{{ route('create.ingresoCaja') }}"
                                class="hover:bg-gray-500 bg-gray-600 text-gray-200 px-3 py-1 cursor-pointer rounded">Ingresar</a>
                            <a href="{{ route('create.egresoCaja') }}"
                                class="hover:bg-gray-500 bg-gray-600 text-gray-200 px-3 py-1 cursor-pointer rounded">Retirar</a>
                        </div>
                    </div>
                    <div>
                        <div class="dark:text-gray-500">
                            <button type="button" class="bg-gray-300 text-gray-800 p-2 rounded" data-bs-toggle="modal"
                                id="abrir-modal">Cerrar Caja</button>
                        </div>
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

   <!-- Modal -->
   <div id="confirmarCerrarCajaModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-white rounded-lg p-8 w-1/3">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Confirmar Cerrar Caja</h2>
            <button id="cerrarModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <p class="mb-4">¿Estás seguro de que deseas cerrar la caja?</p>
        <div class="flex justify-end gap-10">
            <a {{-- href="{{ route('cerrar.caja') }}" --}} class="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer">Confirmar Cerrar Caja</a>
            <button id="cancelarCerrarCaja" class="bg-blue-300 text-gray-800 px-4 py-2 rounded-md mr-2">Cancelar</button>
        </div>
    </div>
</div>
</x-app-layout>

<script>
    const modal = document.getElementById('confirmarCerrarCajaModal');
    const abrirModalBoton = document.getElementById('abrir-modal');
    const cerrarModalBoton = document.getElementById('cerrarModal');
    const cancelarCerrarCajaBoton = document.getElementById('cancelarCerrarCaja');

    abrirModalBoton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    cerrarModalBoton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    cancelarCerrarCajaBoton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
</script>


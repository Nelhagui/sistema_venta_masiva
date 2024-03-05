<x-app-layout>
    <x-slot:title>
        Editar Producto
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col">
                {{-- {{$producto->tipo}} --}}
                <form action="{{ route('update.productos', $producto->id) }}" method="POST">
                    @csrf
                    <div class="flex justify-end">
                        <x-primary-button>
                            Guardar Cambios
                        </x-primary-button>
                    </div>
                    <div class="flex gap-3">
                        <div class="my-3">
                            <label for="titulo">Título</label><br>
                            <div style="width: 280px">
                                <input type="text" name="titulo" required value="{{ $producto->titulo }}"
                                    oninput="this.value = this.value.toUpperCase()"
                                    class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            @error('titulo')
                                <div class="text-red-500 alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="my-3">
                            <label for="tipo">Tipo</label><br>
                            <div style="width: 280px">
                                <select name="tipo" id="tipo"
                                    class="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="unidad" {{ $producto->tipo == 'unidad' ? 'selected' : '' }}>Unidad
                                    </option>
                                    <option value="fraccion" {{ $producto->tipo == 'fraccion' ? 'selected' : '' }}>
                                        Fracción
                                    </option>
                                    <option value="costo_adicional"
                                        {{ $producto->tipo == 'costo_adicional' ? 'selected' : '' }}>Costo Adicional
                                    </option>
                                </select>
                            </div>
                            @error('tipo')
                                <div class="text-red-500 alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>


                    <div class="flex items-center gap-4 mt-3">
                        <div class="my-3">
                            <label for="precio_costo">Precio costo</label><br>
                            <div style="width: 280px">
                                <input type="number" name="precio_costo" id="precio_costo" step="any"
                                    @if ($producto->tipo != 'costo_adicional') required @endif
                                    value="{{ $producto->precio_costo }}"
                                    @if ($producto->tipo == 'costo_adicional') disabled @endif
                                    class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            @error('precio_costo')
                                <div class="text-red-500 alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="flex gap-2 border p-3">
                            <div>
                                <label for="valor_precio_costo">Valor</label><br>
                                <div style="width: 150px">
                                    <input type="number" name="valor_precio_costo" id="valor_precio_costo"
                                        step="any"
                                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label for="cantidad_precio_costo">Cantidad</label><br>
                                <div style="width: 150px">
                                    <input type="number" name="cantidad_precio_costo" id="cantidad_precio_costo"
                                        step="any"
                                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                        </div>
                        <div class="flex">
                            <p style="font-size: 12px"> Asistente para calcular costo individual del producto dentro de
                                un paquete. <br> Ejemplo: Bolsa de caramelos.</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 mt-3">
                        <div class="my-3">
                            <label for="precio_venta">Precio Venta</label><br>
                            <div style="width: 280px">
                                <input type="number" name="precio_venta" id="precio_venta" step="any"
                                    @if ($producto->tipo != 'costo_adicional') required @endif
                                    value="{{ $producto->precio_venta }}"
                                    @if ($producto->tipo == 'costo_adicional') disabled @endif
                                    class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            @error('precio_venta')
                                <div class="text-red-500 alert-danger mt-2">{{ $message }}</div>
                            @enderror

                        </div>
                        <div class="flex gap-2 border p-2">
                            {{-- calculador --}}
                            <div>
                                <label for="porcentaje_aumento">Aumento Porcentaje</label><br>
                                <div style="width: 150px">
                                    <input type="number" name="porcentaje_aumento" id="porcentaje_aumento"
                                        step="any" value="{{ $producto->porcenjate_aumento }}"
                                        class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <p style="font-size: 12px"> Asistente para calcular el precio venta a partir de un
                                porcentaje de aumento.</p>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-3">
                        <div class="my-3">
                            <label for="stock_actual">Stock</label><br>
                            <div style="width: 280px">
                                <input type="number" name="stock_actual" required
                                    value="{{ $producto->stock_actual }}"
                                    class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            @error('stock_actual')
                                <div class="text-red-500 alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="my-3">
                            <label for="codigo_barra">Código de barra</label><br>
                            <div style="width: 280px">
                                <input type="text" name="codigo_barra" value="{{ $producto->codigo_barra }}"
                                    class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            @error('codigo_barra')
                                <div class="text-red-500 alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const cantidadInput = document.getElementById('cantidad_precio_costo');
            const valorInput = document.getElementById('valor_precio_costo');
            const precioCostoInput = document.getElementById('precio_costo');

            cantidadInput.addEventListener('input', calcularValorCosto);
            valorInput.addEventListener('input', calcularValorCosto);

            function calcularValorCosto() {
                const cantidad = parseFloat(cantidadInput.value);
                const valor = parseFloat(valorInput.value);

                if (!isNaN(cantidad) && !isNaN(valor)) {
                    const valorCosto = valor / cantidad;
                    precioCostoInput.value = valorCosto.toFixed(2);
                }
            }
        });
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const precioVentaInput = document.getElementById('precio_venta');
            const porcentajeAumentoInput = document.getElementById('porcentaje_aumento');
            const precioCostoInput = document.getElementById('precio_costo');

            function calcularPrecioVenta() {
                const precioCosto = parseFloat(precioCostoInput.value);
                const porcentajeAumento = parseFloat(porcentajeAumentoInput.value);
                const aumento = (precioCosto * porcentajeAumento) / 100;
                const precioVenta = precioCosto + aumento;
                precioVentaInput.value = precioVenta.toFixed(2);
            }

            function calcularPorcentajeAumento() {
                const precioVenta = parseFloat(precioVentaInput.value);
                const precioCosto = parseFloat(precioCostoInput.value);
                const aumento = precioVenta - precioCosto;
                const porcentajeAumento = (aumento / precioCosto) * 100;
                porcentajeAumentoInput.value = porcentajeAumento.toFixed(2);
            }

            function calcularPorcentajeInicial() {
                const precioVenta = parseFloat(precioVentaInput.value);
                const precioCosto = parseFloat(precioCostoInput.value);
                const aumento = precioVenta - precioCosto;
                const porcentajeAumento = (aumento / precioCosto) * 100;
                porcentajeAumentoInput.value = porcentajeAumento.toFixed(2);
            }

            precioVentaInput.addEventListener('input', calcularPorcentajeAumento);
            porcentajeAumentoInput.addEventListener('input', calcularPrecioVenta);
            precioCostoInput.addEventListener('input', () => {
                calcularPorcentajeAumento();
                calcularPrecioVenta();
            });

            // Calcular porcentaje inicial si hay valores al cargar la página
            if (precioVentaInput.value && precioCostoInput.value) {
                calcularPorcentajeInicial();
            }
        });
    </script>

    <script>
        var precioCostoValue = document.getElementById('precio_costo').value;
        var precioVentaValue = document.getElementById('precio_venta').value;

        document.getElementById('tipo').addEventListener('change', function() {
            var precioCostoInput = document.getElementById('precio_costo');
            var precioVentaInput = document.getElementById('precio_venta');


            if (this.value === 'costo_adicional') {
                precioCostoInput.removeAttribute('required');
                precioVentaInput.removeAttribute('required');

                precioCostoInput.setAttribute('disabled', true);
                precioVentaInput.setAttribute('disabled', true);

                precioCostoInput.value = '';
                precioVentaInput.value = '';
            } else {
                precioCostoInput.setAttribute('required', true);
                precioVentaInput.setAttribute('required', true);

                precioCostoInput.removeAttribute('disabled');
                precioVentaInput.removeAttribute('disabled');

                precioCostoInput.value = precioCostoValue;
                precioVentaInput.value = precioVentaValue;
            }
        });
    </script>
</x-app-layout>


<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Crear Productos') }}
        </h2>
    </x-slot>
    <style>
        .border {
            border-width: 1px;
        }
        .border-slate-500 {
            --tw-border-opacity: 1;
            border-color: rgb(100 116, 139);
        }
        .border-slate-600 {
            /* --tw-border-opacity: 1; */
            border-color: rgb(71 85, 105);
        }
        .border-slate-700 {
            --tw-border-opacity: 1;
            border-color: rgb(51 6,5 85);
        }

        .dinone {display: none !important;}

        #buscador_producto {
            min-width: 450px;
            appearance: none;
            background-color: #fff;
            border-color: #6b7280;
            border-width: 1px;
            border-radius: 0px;
            padding-top: 0.5rem;
            padding-right: 0.75rem;
            padding-bottom: 0.5rem;
            padding-left: 0.75rem;
            font-size: 1rem;
            line-height: 1.5rem;
        }
    </style>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-gray-100 flex flex-col">
                <div class="flex flex-row justify-between">
                    <div>
                        <a href="{{ route('index.productos') }}" class="button-link">Ver lista de productos</a>
                    </div>
                    <div>
                        <a href="{{route('index.productosBase')}}">Agregar producto desde "lista de productos base"</a>
                    </div>
                </div>
                <div>
                    <input id="buscador_producto" value="" placeholder="Ingrese el código de barras o título" onkeyup="buscaProducto(this)" autocomplete="off" required >
                    <input type="hidden" name="producto_id" id="producto_id">
                </div>
                
                <ul id="resultado_busqueda_mag" class="cont-resul-busca dinone">
                </ul>

                <form action="{{route('store.productos')}}" method="POST" class="mt-2">
                    @csrf
                    
                    <table class="table-auto border-collapse border border-slate-500 text-sm w-100">
                        <thead>
                            <tr>
                                <th class="text-left p-2 border border-slate-600">Titulo</th>
                                <th class="text-left p-2 border border-slate-600">Código Barra</th>
                                <th class="text-left p-2 border border-slate-600">Precio Costo</th>
                                <th class="text-left p-2 border border-slate-600">Precio Venta</th>
                                <th class="text-left p-2 border border-slate-600 ">Stock</th>
                                <th class="text-left p-2 border border-slate-600">Control por lote</th>
                                <th class="text-left p-2 border border-slate-600">Fecha vencimiento</th>
                                <th class="text-left p-2 border border-slate-600">Proveedor</th>
                                <th class="text-left p-2 border border-slate-600">Factura</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTabla">
                            <tr class="highlighted-none">
                                <td class="p-2 border border-slate-700">
                                    <input 
                                        type="text" 
                                        name="productos[0][titulo]" 
                                        required 
                                        value="{{old('titulo')}}"
                                        style="padding: 2px"    
                                    >
                                    @error('titulo')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input 
                                        type="text" 
                                        name="productos[0][codigo_barra]" 
                                        required 
                                        value="{{old('codigo_barra')}}"
                                        style="max-width: 7.8em; padding: 2px" 
                                    >
                                    @error('codigo_barra')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        name="productos[0][precio_costo]"
                                        required
                                        style="max-width: 5rem; padding: 2px"  
                                        type="number"
                                        value="{{old('precio_costo')}}"
                                    />
                                    @error('precio_costo')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        name="productos[0][precio_venta]"
                                        required
                                        style="max-width: 5rem; padding: 2px"  
                                        type="number"
                                        value="{{old('precio_venta')}}"
                                    />
                                    @error('precio_venta')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        style="max-width: 3rem; padding: 2px"
                                        name="productos[0][stock]"  
                                        required
                                        type="text"
                                        value="{{old('stock')}}"
                                    />
                                    @error('stock')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        type="checkbox"
                                        name="productos[0][control_por_lote]"
                                        id="control_por_lote_0"
                                        onclick="deshabilitarCamposAdicionales('0')"
                                    />
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        type="date"
                                        name="productos[0][fecha_vencimiento]"
                                        id="fecha_vencimiento_0"
                                        value="{{old('fecha_vencimiento')}}"
                                        disabled
                                    />
                                    @error('fecha_vencimiento')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <select
                                        class='text-sm'
                                        name="productos[0][proveedor_id]"
                                        id="proveedor_id_0"
                                        value="{{old('proveedor_id')}}"
                                        disabled
                                    >
                                        <option value="">Seleccione un proveedor</option>
                                        @foreach ($proveedores as $proveedor)
                                            <option value="{{$proveedor->id}}">{{$proveedor->nombre}}</option>
                                        @endforeach
                                    </select>
                                    @error('proveedor_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        type="text"
                                        name="productos[0][numero_factura]"
                                        value="{{old('numero_factura')}}"
                                        id="numero_factura_0"
                                        style="padding: 2px"   
                                        disabled
                                    />
                                    @error('numero_factura')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex flex-row justify-between mt-3">
                        <div>
                            <button type="button" id="agregarProductoBtn">Agregar fila</button>
                        </div>
                        <div>
                            <button type="submit">Guardar producto</button>
                        </div>
                    </div>    
                </form>
            </div>
        </div>
    </div>


    <script>
        // document.addEventListener('DOMContentLoaded', function () {
            let contadorFilas = 1
            function agregarFila(data = false) {
                console.log(data)
                const cuerpoTabla = document.getElementById('cuerpoTabla')
                const nuevaFila = document.createElement('tr')

                nuevaFila.innerHTML = `
                    <td class="p-2 border border-slate-700">
                        <input 
                            type="text" 
                            name="productos[${contadorFilas}][titulo]"  
                            required 
                            style="padding: 2px"   
                            value="${data ? data.titulo : ""}"
                        >
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input 
                            type="text" 
                            name="productos[${contadorFilas}][codigo_barra]" 
                            required 
                            value="${data ? data.codigo_barra : ""}"
                            style="max-width: 7.8em; padding: 2px" 
                        >
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input
                            class='text-sm'
                            name="productos[${contadorFilas}][precio_costo]" 
                            required
                            style="max-width: 5rem; padding: 2px"  
                            type="number"
                        />
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input
                            class='text-sm'
                            name="productos[${contadorFilas}][precio_venta]" 
                            required
                            style="max-width: 5rem; padding: 2px"  
                            type="number"
                        />
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input
                            class='text-sm'
                            style="max-width: 3rem; padding: 2px"
                            name="productos[${contadorFilas}][stock]" 
                            required
                            type="text"
                        />
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input
                            class='text-sm'
                            type="checkbox"
                            name="productos[${contadorFilas}][control_por_lote]" 
                            id="control_por_lote_${contadorFilas}"
                            onclick="deshabilitarCamposAdicionales(${contadorFilas})"
                        />
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input
                            class='text-sm'
                            type="date"
                            name="productos[${contadorFilas}][fecha_vencimiento]" 
                            id="fecha_vencimiento_${contadorFilas}"
                            value="{{old('fecha_vencimiento')}}"
                            disabled
                        />
                    </td>
                    <td class="p-2 border border-slate-700">
                        <select
                            class='text-sm'
                            name="productos[${contadorFilas}][proveedor_id]" 
                            id="proveedor_id_${contadorFilas}"
                            value="{{old('proveedor_id')}}"
                            disabled
                        >
                            <option value="">Seleccione un proveedor</option>
                            @foreach ($proveedores as $proveedor)
                                <option value="{{$proveedor->id}}">{{$proveedor->nombre}}</option>
                            @endforeach
                        </select>
                    </td>
                    <td class="p-2 border border-slate-700">
                        <input
                            class='text-sm'
                            type="text"
                            name="productos[${contadorFilas}][numero_factura]" 
                            value="{{old('numero_factura')}}"
                            style="padding: 2px"  
                            id="numero_factura_${contadorFilas}" 
                        />
                    </td>`

                cuerpoTabla.appendChild(nuevaFila)
                contadorFilas++

            }

            // Agrega un evento de clic al botón de agregar producto
            let agregarProductoBtn = document.getElementById('agregarProductoBtn');
            agregarProductoBtn.addEventListener('click', function () {
                agregarFila();
            });

        function deshabilitarCamposAdicionales(valor) {
            let checkbox = document.getElementById(`control_por_lote_${valor}`);
            let fechaVencimiento = document.getElementById(`fecha_vencimiento_${valor}`);
            let proveedor = document.getElementById(`proveedor_id_${valor}`);
            let factura = document.getElementById(`numero_factura_${valor}`);

            fechaVencimiento.disabled = !checkbox.checked;
            proveedor.disabled = !checkbox.checked;
            factura.disabled = !checkbox.checked;
        }

        const path_p = "{{ asset('/') }}";
        let tiempo = 0;
        function buscaProducto(entrada) 
        {
            if(entrada.value.length > 0)
            {
    
                clearTimeout(tiempo);
                tiempo = setTimeout(function(entrada)
                {
                    document.getElementById('resultado_busqueda_mag').innerHTML = '';
                    document.getElementById('resultado_busqueda_mag').classList.remove('dinone');

                    let li = document.createElement('span');
                        li.innerHTML = "Buscando...";
                    document.getElementById('resultado_busqueda_mag').appendChild(li);

                    //acá va la consulta
                    console.log(entrada.value)
                    let url = path_p + 'api/productos/busqueda/'+ encodeURIComponent(entrada.value);
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('resultado_busqueda_mag').innerHTML = '';
                            if (data.length > 0)
                            {
                                console.log(data)
                                data.forEach(producto => {    
                                    let li = document.createElement('li');
                                        li.innerHTML = producto.titulo
                                        li.onclick = function()
                                        {
                                            document.getElementById('producto_id').value = producto.id;
                                            document.getElementById('buscador_producto').value = producto.titulo;
                                            document.getElementById('resultado_busqueda_mag').innerHTML = '';
                                            document.getElementById('resultado_busqueda_mag').classList.add('dinone');
                                            agregarFila(producto)   
                                        }
                                        document.getElementById('resultado_busqueda_mag').appendChild(li);
                                    });

                            }
                            else {
                                let span = document.createElement('span');
                                span.innerHTML = "Sin resultados";
                                document.getElementById('resultado_busqueda_mag').appendChild(span);
                            }
                        })
                        .catch(error => console.log(error));
                
                }, 400, entrada);
            }
            else {
                document.getElementById('resultado_busqueda_mag').innerHTML = ''; 
                document.getElementById('resultado_busqueda_mag').classList.add('dinone');
            }
        }

    </script>
    
</x-app-layout>
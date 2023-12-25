
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

        #tableCreateProductos {
            display: none;
        }

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

        .productosList {
            position: absolute;
            top: 100%;
            left: 0;
            /* min-width: 450px; */
            max-width: max-content;
            max-height: 200px;
            overflow-y: auto;
            background-color: #fff;
            z-index: 1;
            border: 1px solid #ccc;
        }

        .containerRowProducto {
            display: flex;
            justify-content: space-between;
            padding: 9px 15px 9px 10px;
            background-color: #fff
        }

        .containerRowProducto:hover {
            background-color: #f1eff7;
            cursor: pointer
        }

        .seleccionado {
            background-color: #f1eff7;
            cursor: pointer
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
                <div style="position: relative; margin-bottom: 20px">
                    <div class="flex justify-between">
                        <div>
                            <input id="buscador_producto" value="" placeholder="Ingrese el código de barras o título" onkeyup="buscaProducto(this)" autocomplete="off" required >
                            <input type="hidden" name="producto_id" id="producto_id">
                        </div>
                    </div>
                    <ul id="resultado_busqueda_mag" class="cont-resul-busca dinone productosList">
                    </ul>
                </div>

                <form action="{{route('store.productos')}}" method="POST" class="mt-2">
                    @csrf
                    
                    <table id="tableCreateProductos" class="table-auto border-collapse border border-slate-500 text-sm w-100">
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
                                <th class="text-left p-2 border border-slate-600">Factura</th>                                <th class="text-left p-2 border border-slate-600">Inversor</th>
                                <th class="text-left p-2 border border-slate-600">Inversor</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTabla">
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
            const searchInput = document.getElementById('buscador_producto');
            searchInput.focus();

            let contadorFilas = 0
            function agregarFila(data = false) {
                const cuerpoTabla = document.getElementById('cuerpoTabla')
                const filasExistente = cuerpoTabla.querySelectorAll('tr');

                for (let i = 0; i < filasExistente.length; i++) {
                    const codigoBarraFila = filasExistente[i].querySelector(`[name^="productos[${i}][codigo_barra]"]`);
                    if (codigoBarraFila && codigoBarraFila.value === (data ? data.codigo_barra : '')) {
                        filasExistente[i].classList.remove('highlighted-none');
                        filasExistente[i].classList.add('highlighted-row')
                        setTimeout(function() {
                            filasExistente[i].classList.remove('highlighted-row');
                            filasExistente[i].classList.add('highlighted-none');
                        }, 500)
                        // Si se encuentra el mismo código de barras, aumentar el stock y salir de la función
                        const stockInput = filasExistente[i].querySelector(`[name^="productos[${i}][stock]"]`);
                        if (stockInput) {
                            stockInput.value = parseInt(stockInput.value) + 1;
                        }
                        document.getElementById('buscador_producto').value = '';
                        searchInput.focus();
                        return; // Detener la ejecución de la función
                    }
                }

                const nuevaFila = document.createElement('tr')

                nuevaFila.innerHTML = `
                    <td class="p-2 border border-slate-700" data-codigo-barra="${data ? data.codigo_barra : ''}">
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
                            value='1'
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
                    </td>
                    
                    <td class="p-2 border border-slate-700">
                        <select
                            class='text-sm'
                            name="productos[${contadorFilas}][inversor_id]" 
                            id="inversor_id_${contadorFilas}"
                            value="{{old('inversor_id')}}"
                            
                        >
                            <option value="">Seleccione un inversor</option>
                            @foreach ($inversores as $inversor)
                                <option value="{{$inversor->id}}">{{$inversor->nombre}} {{$inversor->apellido}}</option>
                            @endforeach
                        </select>
                    </td>`

                cuerpoTabla.appendChild(nuevaFila)
                contadorFilas++
                searchInput.focus();
                
                nuevaFila.classList.remove('highlighted-none');
                nuevaFila.classList.add('highlighted-row')
                setTimeout(function() {
                    nuevaFila.classList.remove('highlighted-row');
                    nuevaFila.classList.add('highlighted-none');
                }, 500)

                document.getElementById('buscador_producto').value = '';
                // Mostrar la tabla después de agregar la primera fila
                document.getElementById('tableCreateProductos').style.display = 'table';
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

                    let url = path_p + 'api/productos/busqueda/'+ encodeURIComponent(entrada.value);
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('resultado_busqueda_mag').innerHTML = '';
                            if (data.length > 0)
                            {                                
                                if(/^\d+$/.test(entrada.value)) {
                                    agregarFila(data[0])
                                    document.getElementById('buscador_producto').value = '';
                                } else {
                                    data.forEach(producto => {    
                                    let li = document.createElement('li');
                                        li.innerHTML = producto.titulo
                                        li.classList.add('border-t', 'border-b', 'containerRowProducto');
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
        

        // Obtener la lista, para recorrer cada elemento
        let listGroup = document.querySelector('ul.cont-resul-busca');
        // Asignar evento al campo de texto
        document.querySelector('#buscador_producto').addEventListener('keydown', e => {
            if(!listGroup) {
                return; // No existe la lista
            }
            // Obtener todos los elementos
            let items = listGroup.querySelectorAll('li');
            // Saber si alguno está activo
            let actual = Array.from(items).findIndex(item => item.classList.contains('active'));
  
            // Analizar tecla pulsada
            if(e.keyCode == 13) {
                // Tecla Enter, evitar que se procese el formulario
                e.preventDefault();
                // ¿Hay un elemento activo?
                if(items[actual]) {
                    // Hacer clic
                    items[actual].click();
                }
            } if(e.keyCode == 38 || e.keyCode == 40) {
                // Flecha arriba (restar) o abajo (sumar)
                if(items[actual]) {
                    // Solo si hay un elemento activo, eliminar clase
                    items[actual].classList.remove('active');
                }
                // Calcular posición del siguiente
                actual += (e.keyCode == 38) ? -1 : 1;
                // Asegurar que está dentro de los límites
                if(actual < 0) {
                    actual = 0;
                } else if(actual >= items.length) {
                    actual = items.length - 1;
                }
                // Asignar clase activa
                items[actual].classList.add('active');
            }
        });
        // En la función donde generas la lista debes activar evento clic para cada elemento
        // Para este ejemplo se hace manual
        listGroup.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', e => {
                // Asignar valor al campo
                document.querySelector('#buscador_producto').value = e.currentTarget.textContent;
                // Aquí deberías cerrar la lista y/o eliminar el contenido
            });
        });


    </script>
    
</x-app-layout>
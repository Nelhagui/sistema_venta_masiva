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
                <form action="{{route('store.productos')}}" method="POST">
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
                                        id="control_por_lote"
                                    />
                                </td>
                                <td class="p-2 border border-slate-700">
                                    <input
                                        class='text-sm'
                                        type="date"
                                        name="productos[0][fecha_vencimiento]"
                                        id="fecha_vencimiento"
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
                                        id="proveedor_id"
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
                                        style="padding: 2px"   
                                    />
                                    @error('numero_factura')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </td>
                            </tr>
                        </tbody>
                    </table >
                    <button type="button" onclick="agregarFila()">Agregar fila</button>
                    <button type="submit">Guardar producto</button>
                </form>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            let checkbox = document.getElementById('control_por_lote')
            let fechaVencimiento = document.getElementById('fecha_vencimiento')
            let proveedor = document.getElementById('proveedor_id')

            fechaVencimiento.disabled = true
            proveedor.disabled = true

            checkbox.addEventListener('change', function() {
                fechaVencimiento.disabled = !checkbox.checked
                proveedor.disabled = !checkbox.checked
            })
        })
        
        let contadorFilas = 1
        function agregarFila() {
            const cuerpoTabla = document.getElementById('cuerpoTabla')
            const nuevaFila = document.createElement('tr')

            nuevaFila.innerHTML = `
                <td class="p-2 border border-slate-700">
                    <input 
                        type="text" 
                        name="productos[${contadorFilas}][titulo]"  
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
                        name="productos[${contadorFilas}][codigo_barra]" 
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
                        name="productos[${contadorFilas}][precio_costo]" 
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
                        name="productos[${contadorFilas}][precio_venta]" 
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
                        name="productos[${contadorFilas}][stock]" 
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
                        name="productos[${contadorFilas}][control_por_lote]" 
                        id="control_por_lote"
                    />
                </td>
                <td class="p-2 border border-slate-700">
                    <input
                        class='text-sm'
                        type="date"
                        name="productos[${contadorFilas}][fecha_vencimiento]" 
                        id="fecha_vencimiento"
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
                        name="productos[${contadorFilas}][proveedor_id]" 
                        id="proveedor_id"
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
                        name="productos[${contadorFilas}][numero_factura]" 
                        value="{{old('numero_factura')}}"
                        style="padding: 2px"   
                    />
                    @error('numero_factura')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </td>
                            
            `

            cuerpoTabla.appendChild(nuevaFila)
            contadorFilas++
        }
    </script>
</x-app-layout>
document.addEventListener('DOMContentLoaded', function () {
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
                            id="control_por_lote_${contadorFilas}"
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
                        @error('fecha_vencimiento')
                            <div class="alert alert-danger">{{ $message }}</div>
                        @enderror
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

                deshabilitarCamposAdicionales();
            }

            function deshabilitarCamposAdicionales() {
                for (let i = 0; i < contadorFilas; i++) {
                    let checkbox = document.getElementById(`control_por_lote_${i}`);
                    let fechaVencimiento = document.getElementById(`fecha_vencimiento_${i}`);
                    let proveedor = document.getElementById(`proveedor_id_${i}`);

                    fechaVencimiento.disabled = !checkbox.checked;
                    proveedor.disabled = !checkbox.checked;
                }
            }

               // Agrega un evento de clic al botón de agregar producto
                let agregarProductoBtn = document.getElementById('agregarProductoBtn');
                agregarProductoBtn.addEventListener('click', function () {
                    agregarFila();
                    deshabilitarCamposAdicionales();  // Asegúrate de llamar a esta función después de agregar una nueva fila
                });

                // Deshabilita los campos adicionales al cargar la página
                deshabilitarCamposAdicionales();

                // Agrega un evento de cambio a cada checkbox de control_por_lote
                for (let i = 0; i < contadorFilas; i++) {
                    let checkbox = document.getElementById(`control_por_lote_${i}`);
                    checkbox.addEventListener('change', function () {
                        deshabilitarCamposAdicionales();
                    });
                } 
            })
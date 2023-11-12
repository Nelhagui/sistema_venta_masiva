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
                name="titulo" 
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
                name='codigo_barra' 
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
                name='precio_costo'
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
                name='precio_venta'
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
                name="stock"  
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
                name="control_por_lote"
                id="control_por_lote"
            />
        </td>
        <td class="p-2 border border-slate-700">
            <input
                class='text-sm'
                type="date"
                name="fecha_vencimiento"
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
                name="proveedor_id"
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
                name="numero_factura"
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

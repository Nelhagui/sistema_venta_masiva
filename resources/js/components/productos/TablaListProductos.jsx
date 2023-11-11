import React,{useState} from 'react'

const TablaListProductos = ({ productos }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 50;  // Decide cuántos productos quieres por página

    // Calcular el rango de productos a mostrar en la página actual
    const ultimoProducto = paginaActual * productosPorPagina;
    const primerProducto = ultimoProducto - productosPorPagina;
    const productosActuales = productos.slice(primerProducto, ultimoProducto);

    const numeroPaginas = Math.ceil(productos.length / productosPorPagina);
    return (
        <>
            <table className="table-auto border-collapse border border-slate-500" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className="text-left p-2 border border-slate-600">ID</th>
                        <th className="text-left p-2 border border-slate-600">Nombre</th>
                        <th className="text-left p-2 border border-slate-600">Precio Costo</th>
                        <th className="text-left p-2 border border-slate-600">Precio Venta</th>
                        <th className="text-left p-2 border border-slate-600">Stock</th>
                        <th className="text-left p-2 border border-slate-600">Código Barra</th>
                        <th className="text-left p-2 border border-slate-600">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productosActuales.map((producto) =>
                        (
                            <tr key={producto.id}>
                                <td className="p-2 border border-slate-700">{producto.id}</td>
                                <td className="p-2 border border-slate-700">{producto.titulo} </td>
                                <td className="p-2 border border-slate-700">{producto.precio_costo}</td>
                                <td className="p-2 border border-slate-700">{producto.precio_venta}</td>
                                <td className="p-2 border border-slate-700">{producto.stock_actual}</td>
                                <td className="p-2 border border-slate-700">{producto.codigo_barra}</td>
                                <td className="p-2 border border-slate-700"> <a href={`productos/editar/${producto.id}`}>Editar</a></td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table >
            <div className='flex justify-center'>
                <button onClick={() => setPaginaActual(1)} disabled={paginaActual === 1}>Primera</button>
                <button onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))} disabled={paginaActual === 1}>Anterior</button>
                <button onClick={() => setPaginaActual(prev => Math.min(prev + 1, numeroPaginas))} disabled={paginaActual === numeroPaginas}>Siguiente</button>
                <button onClick={() => setPaginaActual(numeroPaginas)} disabled={paginaActual === numeroPaginas}>Última</button>
            </div>
        </>
    )
}

export default TablaListProductos
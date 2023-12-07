import React, { useState, useEffect } from 'react'

const ResumenPedido = ({ productosSeleccionados, setProductosSeleccionados, montoTotalMarkups }) => {
    const [total, setTotal] = useState(0)
    const [vuelto, setVuelto] = useState(null)
    const [inputVuelto, setInputVuelto] = useState('')

    useEffect(() => {
        if (productosSeleccionados.length > 0) {
            obtenerTotal();
        } else {
            setTotal(0)
        }
    }, [productosSeleccionados])

    const handleInputChangeCantidad = (e, productoId) => {
        const nuevaCantidad = e.target.value;
        if (nuevaCantidad > 0) {
            const productosActualizados = productosSeleccionados.map(producto => {
                if (producto.id === productoId) {
                    return { ...producto, cantidad: Number(nuevaCantidad) };
                }
                return producto;
            });
            setProductosSeleccionados(productosActualizados);
        }
    };

    const sacarProducto = (productoId) => {
        const filtrados = productosSeleccionados.filter((item) => item.id !== productoId)
        setProductosSeleccionados(filtrados);
    }
    const borrarSeleccionados = () => {
        setProductosSeleccionados([]);
    }

    const obtenerTotal = () => {
        const total = productosSeleccionados.reduce((sum, producto) => sum + (producto.precio_venta * producto.cantidad), 0);
        setTotal(total);
        setVuelto(inputVuelto - total)
    }

    useEffect(() => {
        if (inputVuelto) {
            setVuelto(inputVuelto - total)
        }
    }, [inputVuelto])


    return (
        <div style={{
            backgroundColor: "rgb(226 232 240)",
            maxWidth: '90%',
            margin: 'auto',
            padding: 35,
            display: 'flex',
            flexDirection: 'column'
        }}
            className='flex justify-center mt-8 rounded'
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <div className='flex items-center'>
                    <p style={{ fontSize: 55 }}>${total}</p>
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <input type="number" value={inputVuelto} style={{ maxWidth: '6rem' }} onChange={(e) => setInputVuelto(e.target.value)} />
                        {
                            vuelto > 0
                                ? <span style={{ marginLeft: 10, color: 'green' }}>Vuelto: {vuelto ?? ""}</span>
                                : <span style={{ marginLeft: 10, color: 'red' }}>Vuelto: {vuelto ?? ""}</span>
                        }
                    </div>
                </div>
                <span onClick={borrarSeleccionados}>X {montoTotalMarkups}</span>
            </div>
            <div className='flex flex-col' style={{ padding: 20 }}>
                <table className="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th className="text-left p-2 border border-slate-600 bg-slate" style={{ background: '#c5d3e5' }}>Unidades</th>
                            <th className="text-left p-2 border border-slate-600 bg-slate" style={{ background: '#c5d3e5' }}>Producto</th>
                            <th className="text-left p-2 border border-slate-600 bg-slate" style={{ background: '#c5d3e5' }}>Unitario</th>
                            <th className="text-left p-2 border border-slate-600 bg-slate" style={{ background: '#c5d3e5' }}>Subtotal</th>
                            <th className="text-left p-2 border border-slate-600 bg-slate" style={{ background: '#c5d3e5' }}>X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productosSeleccionados.map((productoSeleccionado) => (
                                <tr key={Math.random()}>
                                    <td className="p-2 border border-slate-700">
                                        <input type="number"
                                            value={productoSeleccionado?.cantidad}
                                            style={{
                                                backgroundColor: "#ebeef3",
                                                textAlign: "center",
                                                maxWidth: "6rem",
                                            }}
                                            onChange={(e) => handleInputChangeCantidad(e, productoSeleccionado.id)}
                                        />
                                    </td>
                                    <td className="p-2 border border-slate-700">{productoSeleccionado.titulo}</td>
                                    <td className="p-2 border border-slate-700">${productoSeleccionado.precio_venta}</td>
                                    <td className="p-2 border border-slate-700">${productoSeleccionado.precio_venta * (productoSeleccionado.cantidad)}</td>
                                    <td className="p-2 border border-slate-700">
                                        <span style={{ cursor: 'pointer' }} onClick={() => sacarProducto(productoSeleccionado.id)}>x</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResumenPedido
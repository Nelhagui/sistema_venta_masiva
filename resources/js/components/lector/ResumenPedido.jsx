import React, { useState, useEffect } from 'react'
import { useLectorContext } from '../../context/LectorContext.jsx';
import ViewTotalAumentoDescuento from './ViewTotalAumentoDescuento.jsx';
import {
    Table,
    TableHeader, TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Input
} from "@nextui-org/react";
import { CloseIcon } from '../icons/CloseIcon.jsx';
import { CloseIconCircle } from '../icons/CloseIconCircle.jsx';
import { formatearAMoneda } from '../../utils/utils.js';


const ResumenPedido = () => {
    const {
        productosSeleccionados,
        setProductosSeleccionados,
        sacarProducto,
        resetAll
    } = useLectorContext()

    const funCancelarCompra = () => {
        resetAll()
    }

    const handleInputChangeCantidadUnidad = (e, productoId) => {
        const nuevaCantidad = e.target.value;
        if (parseFloat(nuevaCantidad) < 0) {
            // Si es negativo, asignar cero como nuevo valor
            nuevaCantidad = "0";
        }
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

    const exedeLimiteDecimales = (numero, limite = 3) => {
        const numeroComoString = numero.toString();
        const indicePunto = numeroComoString.indexOf('.');
        let cantidadDecimales = 0;

        if (indicePunto !== -1) {
            cantidadDecimales = numeroComoString.length - indicePunto - 1;
        }

        return cantidadDecimales > limite;
    }
    const handleInputFraccionChangeCantidad = (e, productoSeleccionado) => {
        let nuevaCantidad = e.target.value;
        if (parseFloat(nuevaCantidad) < 0) {
            nuevaCantidad = "0"; // Si es negativo, asignar cero como nuevo valor
        }
        
        nuevaCantidad = nuevaCantidad.replace(/^(\d*\.\d{3}).*$/, '$1'); // Limitar a tres decimales después del punto

        const nuevoMonto = nuevaCantidad * productoSeleccionado.precio_venta;

        const productosActualizados = productosSeleccionados.map(producto => {
            if (producto.id === productoSeleccionado.id) {
                return { ...producto, cantidad: isNaN(nuevaCantidad) ? 0 : nuevaCantidad, monto: nuevoMonto };
            }
            return producto;
        });

        setProductosSeleccionados(productosActualizados);
    };

    

    const handleInputFraccionChangeMonto = (e, productoSeleccionado) => {

        let nuevoMonto = e.target.value
        if (parseFloat(nuevoMonto) < 0) {
            // Si es negativo, asignar cero como nuevo valor
            nuevoMonto = "0";
        }
        let nuevaCantidad = nuevoMonto / productoSeleccionado.precio_venta;
        nuevoMonto = nuevoMonto.replace(/^(\d*\.\d{2}).*$/, '$1'); // Limitar a dos decimales después del punto

        const productosActualizados = productosSeleccionados.map(producto => {
            if (producto.id === productoSeleccionado.id) {
                return { ...producto, cantidad: (nuevaCantidad).toFixed(3), monto: nuevoMonto };
            }
            return producto;
        });

        setProductosSeleccionados(productosActualizados);
    };
    const [value, setValue] = useState(1)

    return (
        <>
            <div style={{
                backgroundColor: "#d6d7e9",
                maxWidth: '100%',
                margin: 'auto',
                paddingTop: 15,
                paddingRight: 5,
                paddingLeft: 5,
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
                    <div className='flex items-center px-6'>
                        <ViewTotalAumentoDescuento />
                    </div>
                    <Tooltip
                        delay={500}
                        content={
                            <div className="px-1 py-2">
                                <div className="text-tiny">Cancelar toda la compra</div>
                            </div>
                        }
                    >

                        <span onClick={funCancelarCompra}>
                            <CloseIconCircle style={{ cursor: 'pointer' }} />
                        </span>
                    </Tooltip>
                </div>
                <div className='flex flex-col' style={{ padding: 20 }}>
                    <Table
                        // isStriped
                        aria-label="Lista de productos"
                    >
                        <TableHeader>
                            <TableColumn></TableColumn>
                            <TableColumn>CANT</TableColumn>
                            <TableColumn>PRODUCTO</TableColumn>
                            <TableColumn>UNITARIO</TableColumn>
                            <TableColumn>SUBTOTAL</TableColumn>
                            <TableColumn>ACCION</TableColumn>
                        </TableHeader>
                        <TableBody
                        >
                            {
                                productosSeleccionados.map((productoSeleccionado) => (
                                    <TableRow
                                        key={productoSeleccionado.id}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#cecece',
                                        }}
                                    >
                                        <TableCell
                                            style={{ maxWidth: '1.1rem' }}
                                        >
                                            {
                                                productoSeleccionado.tipo === "fraccion"
                                                    ?
                                                    <div>
                                                        <Tooltip
                                                            content={
                                                                <div className="px-1 py-2">
                                                                    <div className="text-small font-bold">Fracción</div>
                                                                    <div className="text-tiny">0.100 para 100gr</div>
                                                                    <div className="text-tiny">1 para 1kg</div>
                                                                </div>
                                                            }
                                                        >
                                                            <span className='tipo-producto'>
                                                                F
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                    : null
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                productoSeleccionado.tipo === 'fraccion'
                                                    ?
                                                    <>
                                                        <div className='flex gap-2'>
                                                            <div className='flex flex-col'>
                                                                <div style={{ maxWidth: '6rem' }}>
                                                                    <Input
                                                                        label="Peso"
                                                                        type='number'
                                                                        labelPlacement="outside"
                                                                        size='sm'
                                                                        step="0.02"
                                                                        className='max-w-4'
                                                                        placeholder="peso"
                                                                        value={productoSeleccionado.cantidad}
                                                                        onChange={(e) => handleInputFraccionChangeCantidad(e, productoSeleccionado)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <div style={{ maxWidth: '7rem' }}>
                                                                    <Input
                                                                        label="Monto"
                                                                        type='number'
                                                                        labelPlacement="outside"
                                                                        size='sm'
                                                                        step="0.01"
                                                                        className='max-w-4'
                                                                        startContent={
                                                                            <div className="pointer-events-none flex items-center">
                                                                                <span className="text-default-400 text-small">$</span>
                                                                            </div>
                                                                        }
                                                                        placeholder="Ingrese monto"
                                                                        value={ exedeLimiteDecimales(productoSeleccionado.monto) ? productoSeleccionado.monto.toFixed(2) : productoSeleccionado.monto }
                                                                        onChange={(e) => handleInputFraccionChangeMonto(e, productoSeleccionado)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <input type="number"
                                                            // value={productoSeleccionado?.cantidad}
                                                            value={productoSeleccionado.cantidad}
                                                            step="1" // Step de 0.100 solo para productos tipo "fracción"
                                                            style={{
                                                                backgroundColor: "#ebeef3",
                                                                textAlign: "center",
                                                                maxWidth: "6rem",
                                                            }}
                                                            min="0" // Valor mínimo permitido
                                                            onChange={(e) => { handleInputChangeCantidadUnidad(e, productoSeleccionado.id); }}
                                                        />
                                                    </>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {productoSeleccionado.titulo}
                                        </TableCell>
                                        <TableCell>
                                            <p>${formatearAMoneda(productoSeleccionado?.precio_venta)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>${formatearAMoneda(productoSeleccionado.precio_venta * (productoSeleccionado.cantidad))}</p>
                                        </TableCell>
                                        <TableCell>
                                            <CloseIcon
                                                onClick={() => sacarProducto(productoSeleccionado.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ResumenPedido
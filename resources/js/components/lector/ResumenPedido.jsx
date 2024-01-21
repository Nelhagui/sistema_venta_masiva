import React, { useState, useEffect } from 'react'
import { useLectorContext } from '../../context/LectorContext.jsx';
import ExtraValueConfiguration from './ExtraValueConfiguration.jsx';
import ViewTotalAumentoDescuento from './ViewTotalAumentoDescuento.jsx';
import {
    Table,
    TableHeader, TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
} from "@nextui-org/react";
import { CloseIcon } from '../icons/CloseIcon.jsx';
import { CloseIconCircle } from '../icons/CloseIconCircle.jsx';


const ResumenPedido = () => {
    const {
        productosSeleccionados,
        setProductosSeleccionados,
        sacarProducto,
        obtenerTotal,
        cancelarCompra
    } = useLectorContext()

    const funCancelarCompra = () => {
        cancelarCompra()
    }

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

    return (
        <>
            <ExtraValueConfiguration />
            <div style={{
                backgroundColor: "rgb(226 232 240)",
                maxWidth: '100%',
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
                        <ViewTotalAumentoDescuento/>
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
                    <Table isStriped aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>CANT</TableColumn>
                            <TableColumn>PRODUCTO</TableColumn>
                            <TableColumn>UNITARIO</TableColumn>
                            <TableColumn>SUBTOTAL</TableColumn>
                            <TableColumn>ACCION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                productosSeleccionados.map((productoSeleccionado) => (
                                    <TableRow key={Math.random()}>
                                        <TableCell>
                                            <input type="number"
                                                value={productoSeleccionado?.cantidad}
                                                style={{
                                                    backgroundColor: "#ebeef3",
                                                    textAlign: "center",
                                                    maxWidth: "6rem",
                                                }}
                                                onChange={(e) => handleInputChangeCantidad(e, productoSeleccionado.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {productoSeleccionado.titulo}
                                        </TableCell>
                                        <TableCell>
                                            <p>${productoSeleccionado?.precio_venta}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>${productoSeleccionado.precio_venta * (productoSeleccionado.cantidad)}</p>
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
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHeader, TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Input,
    Select,
    SelectItem,
    Tabs,
    Tab,
    Card,
    CardBody,
    Accordion,
    AccordionItem,
    Button
} from "@nextui-org/react";
import { CloseIcon } from '../icons/CloseIcon.jsx';
import { CloseIconCircle } from '../icons/CloseIconCircle.jsx';
import { ChangesInPaymentIcon } from '../icons/ChangesInPaymentIcon.jsx';

const ResumenPedido = ({ productosSeleccionados, setProductosSeleccionados, montoTotalMarkups, metodosDePago }) => {
    const [total, setTotal] = useState(0)

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
    }

    const [tipoVariablePrecio, setTipoVariablePrecio] = useState('$')

    const cambioTipoAumento = (e) => {
        const value = e.target.value;
        if (value === '1') {
            setTipoVariablePrecio('$')
        } else {
            setTipoVariablePrecio('%')
        }
    }


    return (
        <>
            <Accordion
                isCompact
                variant="bordered"
                className='mb-4'
                selectionMode="multiple"
            >
                <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    // title="Aumento - Descuento - Vuelto"
                    startContent={
                        <ChangesInPaymentIcon />
                    }
                    subtitle="Vuelto, Aumentos y Descuentos"
                >
                    <div className='flex mb-4 justify-between'>
                        <Input
                            className='w-2/5'
                            type="number"
                            size='sm'
                            label="Vuelto"
                            placeholder="0.00"
                            // labelPlacement="outside"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                        />
                        <div className='flex gap-4'>

                            <Input
                                label="Aumento"
                                className='w-2/5'
                                size='sm'
                                placeholder="0.00"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">{tipoVariablePrecio}</span>
                                    </div>
                                }
                                endContent={
                                    <div className="flex items-center">
                                        <label className="sr-only" htmlFor="currency">
                                            Currency
                                        </label>
                                        <select
                                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                                            id="currency"
                                            name="currency"
                                            onChange={(e) => cambioTipoAumento(e)}
                                        >
                                            <option value="1">$</option>
                                            <option value="2">%</option>
                                        </select>
                                    </div>
                                }
                                type="number"
                            />
                            <Input
                                label="Descuento"
                                className='w-2/5'
                                size='sm'
                                placeholder="0.00"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">$</span>
                                    </div>
                                }
                                endContent={
                                    <div className="flex items-center">
                                        <label className="sr-only" htmlFor="currency">
                                            Currency
                                        </label>
                                        <select
                                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                                            id="currency"
                                            name="currency"
                                        >
                                            <option>%</option>
                                            <option>ARS</option>
                                        </select>
                                    </div>
                                }
                                type="number"
                            />
                        </div>

                    </div>
                </AccordionItem>
                {/* <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                    Este es el segundo
                </AccordionItem> */}
            </Accordion>

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
                        <p style={{ fontSize: 55 }}>${total}</p>
                    </div>
                    <Tooltip
                        delay={500}
                        content={
                            <div className="px-1 py-2">
                                <div className="text-tiny">Cancelar toda la compra</div>
                            </div>
                        }
                    >

                        <span onClick={borrarSeleccionados}>
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
import React from 'react'
import { useLectorContext } from '../../../context/LectorContext.jsx';
import ViewTotalAumentoDescuento from '../ViewTotalAumentoDescuento.jsx';
import { urls } from '../../../config/config.js';
import {
    Table,
    TableHeader, TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button
} from "@nextui-org/react";
import { CloseIcon } from '../../icons/CloseIcon.jsx.jsx';
import { CloseIconCircle } from '../../icons/CloseIconCircle.jsx';
import { formatearAMoneda } from '../../../utils/utils.js';
import Vuelto from '../extraValueConfiguraciones/Vuelto.jsx';
import ExtraValueConfiguration from '../extraValueConfiguraciones/ExtraValueConfiguration.jsx';
import { ChangesInPaymentIcon } from '../../icons/ChangesInPaymentIcon.jsx';
import IconTipoProducto from './IconTipoProducto.jsx';
import InputCantidadTipoProducto from './InputCantidadTipoProducto.jsx';
import { capitalizeToUpperCase } from '../../../utils/utils.js';


const ResumenPedido = () => {
    const {
        productosSeleccionados,
        setProductosSeleccionados,
        sacarProducto,
        obtenerTotalSegunTipoProducto,
        resetAll,
        setMetodoPagoSeleccionado
    } = useLectorContext()

    const funCancelarCompra = () => {
        resetAll()
        setMetodoPagoSeleccionado("0");
    }

    const handleInputChangeCantidadUnidad = (e, productoSeleccionado) => {
        let nuevaCantidad = e.target.value;
        if (parseFloat(nuevaCantidad) < 0) {
            // Si es negativo, asignar cero como nuevo valor
            nuevaCantidad = "0";
        }
        if (nuevaCantidad > 0) {
            const productosActualizados = productosSeleccionados.map(producto => {
                if (producto.id === productoSeleccionado.id) {
                    return { ...producto, cantidad: Number(nuevaCantidad) };
                }
                return producto;
            });
            setProductosSeleccionados(productosActualizados);
        }
    };

    const handleInputChangeVentaAdicional = (e, productoSeleccionado) => {
        const { value, name } = e.target;
        let nuevoValor = value;
        if (parseFloat(nuevoValor) < 0) {
            nuevoValor = "0";
        }
        const productosActualizados = productosSeleccionados.map(producto => {
            if (producto.id === productoSeleccionado.id) {
                return { ...producto, cantidad: 1, [name]: nuevoValor };
            }
            return producto;
        });
        setProductosSeleccionados(productosActualizados);
    };

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
                    <div className='flex'>
                        <div className='flex'>
                            <div className='w-100 md:w-32 lg:w-48' style={{ marginRight: 20 }}>
                                <Popover placement="bottom" showArrow offset={10}>
                                    <PopoverTrigger>

                                        <Button style={{ backgroundColor: 'white', borderWidth: 0.5, color: '#71717a' }}>
                                            <ChangesInPaymentIcon />
                                            Descuento - Aumento
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[240px]">
                                        {(titleProps) => (
                                            <div className="px-1 py-2 w-full">
                                                <div className="mt-2 flex flex-col gap-2 w-full">
                                                    <ExtraValueConfiguration />
                                                </div>
                                            </div>
                                        )}
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className='w-100 md:w-32 lg:w-48' style={{ marginRight: 20 }}>
                                <Vuelto />
                            </div>
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
                                        <TableCell style={{ maxWidth: '1.1rem' }} >
                                            <IconTipoProducto tipo={productoSeleccionado.tipo} />
                                        </TableCell>
                                        <TableCell>
                                            <InputCantidadTipoProducto productoSeleccionado={productoSeleccionado} handleInputFraccionChangeCantidad={handleInputFraccionChangeCantidad} handleInputChangeCantidadUnidad={handleInputChangeCantidadUnidad} handleInputFraccionChangeMonto={handleInputFraccionChangeMonto} handleInputChangeVentaAdicional={handleInputChangeVentaAdicional} />
                                        </TableCell>
                                        <TableCell>
                                            <a href={`${urls.productos.editar}/${productoSeleccionado.id}`} target="_blank" className='link-hover'>
                                                {capitalizeToUpperCase(productoSeleccionado.titulo)}
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                productoSeleccionado.tipo === 'costo_adicional'
                                                    ? <p>-</p>
                                                    : `$${formatearAMoneda(productoSeleccionado?.precio_venta)}`
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <p>
                                                ${formatearAMoneda(obtenerTotalSegunTipoProducto(productoSeleccionado))}
                                            </p>
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
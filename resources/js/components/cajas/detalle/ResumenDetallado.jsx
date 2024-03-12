import React from 'react'
import {
    Card,
    CardBody,
    Divider
} from "@nextui-org/react";
import { formatearAMoneda } from '../../../utils/utils';

const ResumenDetallado = ({ ventas, metodos, movimientosRetiro, movimientosAdicion, sesionActual }) => {
    let sumaTotalGanancias = 0;
    const totalAdicionRetiro = Number(movimientosAdicion) + Number(-1 * movimientosRetiro);
    const ventasFiltradas = ventas.filter(venta => venta.anulada !== 1);

    const ventasFiltradasConAumento = ventasFiltradas.filter(venta => venta.aumento > 0);
    const totalAumentos = ventasFiltradasConAumento.reduce((total, venta) => total + parseFloat(venta.aumento), 0);
    const totalAumentosFormateado = totalAumentos.toFixed(2); // Redondear a dos decimales

    const ventasFiltradasConDescuento = ventasFiltradas.filter(venta => venta.descuento > 0);
    const totalDescuentos = ventasFiltradasConDescuento.reduce((total, venta) => total + parseFloat(venta.descuento), 0);
    const totalDescuentosFormateado = totalDescuentos.toFixed(2); // Redondear a dos decimales

    metodos.sort((a, b) => { if (a.id > b.id) { return 1; } if (a.id < b.id) { return -1; } return 0; })

    return (
        <div className='mt-4'>
            <div className='mt-4'>
                <div className='flex flex-col mt-1'>
                    <div className='flex gap-2'>
                        {metodos?.map((metodo) => {
                            // Filtrar las ventas por el método actual y que no estén anuladas
                            const ventasPorMetodo = ventasFiltradas.filter(venta => Number(venta.metodos_de_pago) === Number(metodo.id));

                            const ventasFiltradasConAumentoEnMetodo = ventasPorMetodo.filter(venta => venta.aumento > 0);
                            const totalAumentosEnMetodo = ventasFiltradasConAumentoEnMetodo.reduce((total, venta) => total + parseFloat(venta.aumento), 0);
                            const totalAumentosFormateado = totalAumentosEnMetodo.toFixed(2); // Redondear a dos decimales

                            const ventasFiltradasConDescuentoEnMetodo = ventasPorMetodo.filter(venta => venta.descuento > 0);
                            const totalDescuentosEnMetodo = ventasFiltradasConDescuentoEnMetodo.reduce((total, venta) => total + parseFloat(venta.descuento), 0);
                            const totalDescuentosFormateado = totalDescuentosEnMetodo.toFixed(2); // Redondear a dos decimales

                            const totalDescuentoAumentoEnMetodo = Number(totalAumentosFormateado) - Number(totalDescuentosFormateado)

                            // Calcular el total de ventas para el método actual
                            const totalVentaMetodo = Number(ventasPorMetodo.reduce((total, venta) => total + parseFloat(venta.monto_total_venta), 0)) + Number(totalDescuentoAumentoEnMetodo);

                            const totalConApertura = metodo.id === 0 ? (Number(totalVentaMetodo) + Number(sesionActual.monto_inicial) + Number(totalAdicionRetiro)) : totalVentaMetodo;

                            return (
                                <Card key={metodo?.id} shadow='sm' style={{ minWidth: '133px' }}>
                                    <CardBody>
                                        <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Total {metodo?.nombre}</p>
                                        <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(totalConApertura)}</p>
                                    </CardBody>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex flex-col mt-1'>
                    <div className='flex gap-2'>
                        {metodos?.map((metodo) => {
                            // Filtrar las ventas por el método actual y que no estén anuladas
                            const ventasPorMetodo = ventasFiltradas.filter(venta => Number(venta.metodos_de_pago) === Number(metodo.id));

                            const ventasFiltradasConAumentoEnMetodo = ventasPorMetodo.filter(venta => venta.aumento > 0);
                            const totalAumentosEnMetodo = ventasFiltradasConAumentoEnMetodo.reduce((total, venta) => total + parseFloat(venta.aumento), 0);
                            const totalAumentosFormateado = totalAumentosEnMetodo.toFixed(2); // Redondear a dos decimales

                            const ventasFiltradasConDescuentoEnMetodo = ventasPorMetodo.filter(venta => venta.descuento > 0);
                            const totalDescuentosEnMetodo = ventasFiltradasConDescuentoEnMetodo.reduce((total, venta) => total + parseFloat(venta.descuento), 0);
                            const totalDescuentosFormateado = totalDescuentosEnMetodo.toFixed(2); // Redondear a dos decimales

                            const totalDescuentoAumentoEnMetodo = Number(totalAumentosFormateado) - Number(totalDescuentosFormateado)

                            // Calcular el total de ventas para el método actual
                            const totalVentaMetodo = ventasPorMetodo.reduce((total, venta) => total + parseFloat(venta.monto_total_venta), 0) + Number(totalDescuentoAumentoEnMetodo);
                            const totalCostoMetodo = ventasPorMetodo.reduce((total, venta) => total + parseFloat(venta.monto_total_costo), 0);

                            const totalGananciaMetodo = Number(totalVentaMetodo) - Number(totalCostoMetodo);

                            sumaTotalGanancias += totalGananciaMetodo;

                            return (
                                <Card key={metodo?.id} shadow='sm' style={{ minWidth: '133px' }}>
                                    <CardBody>
                                        <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Ganancia {metodo?.nombre}</p>
                                        <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(totalGananciaMetodo)}</p>
                                    </CardBody>
                                </Card>
                            )
                        })}
                        <Card key={Math.random()} shadow='sm' style={{ minWidth: '133px' }}>
                            <CardBody>
                                <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Total Ganancias</p>
                                <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(sumaTotalGanancias)}</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex gap-2 mt-1'>
                    <Card shadow='sm' style={{ minWidth: '133px' }}>
                        <CardBody>
                            <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Aumentos</p>
                            <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${totalAumentosFormateado}</p>
                        </CardBody>
                    </Card>
                    <Card shadow='sm' style={{ minWidth: '133px' }}>
                        <CardBody>
                            <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Descuentos</p>
                            <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${totalDescuentosFormateado}</p>
                        </CardBody>
                    </Card>
                    <Card shadow='sm' style={{ minWidth: '133px' }}>
                        <CardBody>
                            <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Ingresos</p>
                            <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(movimientosAdicion)}</p>
                        </CardBody>
                    </Card>
                    <Card shadow='sm' style={{ minWidth: '133px' }}>
                        <CardBody>
                            <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Egresos</p>
                            <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(movimientosRetiro)}</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ResumenDetallado
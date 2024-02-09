import React from 'react'
import {
    Card,
    CardBody
} from "@nextui-org/react";
import { formatearAMoneda } from '../../../utils/utils';
import fechaUtils from '../../../utils/fechaUtils';

const ResumenMontos = ({ ventas, caja }) => {

    // Calcular el total de 'monto_total_costo'
    const totalCosto = ventas.reduce((total, venta) => total + parseFloat(venta.monto_total_costo), 0);
    const totalCostoFormateado = totalCosto.toFixed(2); // Redondear a dos decimales

    // Calcular el total de 'monto_total_venta'
    const totalVenta = ventas.reduce((total, venta) => total + parseFloat(venta.monto_total_venta), 0);
    const totalVentaFormateado = totalVenta.toFixed(2); // Redondear a dos decimales

    // Verificar si los decimales son todos cero
    const todosDecimalesCero = totalCostoFormateado.split('.')[1] === '00' && totalVentaFormateado.split('.')[1] === '00';

    // Mostrar el resultado dependiendo de si todos los decimales son cero
    if (todosDecimalesCero) {
        totalCostoFormateado.split('.')[0]; // Mostrar sin decimales
        totalVentaFormateado.split('.')[0]; // Mostrar sin decimales
    } else {
        totalCostoFormateado // Mostrar con decimales
        totalVentaFormateado // Mostrar con decimales
    }

    const diferencia = totalVentaFormateado - totalCostoFormateado;
    const diferenciaFormateada = formatearAMoneda(diferencia);

    return (
        <div className='flex gap-2 mt-4'>
            <Card shadow='sm' style={{ minWidth: '100px' }}>
                <CardBody>
                    <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Ventas</p>
                    <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>{ventas?.length}</p>
                </CardBody>
            </Card>
            <Card shadow='sm' style={{ minWidth: '100px' }}>
                <CardBody>
                    <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Costo</p>
                    <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(totalCostoFormateado)}</p>
                </CardBody>
            </Card>
            <Card shadow='sm' style={{ minWidth: '100px' }}>
                <CardBody>
                    <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Beneficio</p>
                    <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${diferenciaFormateada}</p>
                </CardBody>
            </Card>
            <Card shadow='sm' style={{ minWidth: '100px' }}>
                <CardBody>
                    <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Total</p>
                    <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(totalVentaFormateado)}</p>
                </CardBody>
            </Card>
            {/* <Card shadow='sm' style={{ minWidth: '100px' }}>
                <CardBody>
                    <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Apertura Caja</p>
                    {
                        caja?.monto_inicial && caja?.fecha_hora_apertura
                            ?
                            <>
                                <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(caja?.monto_inicial)}</p>
                                <p className='text-center text-descripcion mt-1' style={{ fontSize: '0.8rem' }}>{fechaUtils.convertirFormatoFecha(caja?.fecha_hora_apertura)}</p>
                            </>
                            : <p className='text-center'> - </p>
                    }
                </CardBody>
            </Card>
            <Card shadow='sm' style={{ minWidth: '100px' }}>
                <CardBody>
                    <p className='text-center' style={{ fontSize: '1rem', fontWeight: '500' }}>Cierre Caja</p>
                    {
                        caja?.fecha_hora_cierre && caja?.monto_final
                            ?
                            <>
                                <p className='text-center text-descripcion mt-1' style={{ fontSize: '1.1rem' }}>${formatearAMoneda(caja?.monto_final)}</p>
                                <p className='text-center text-descripcion mt-1' style={{ fontSize: '0.8rem' }}>{fechaUtils.convertirFormatoFecha(caja?.fecha_hora_cierre)}</p>
                            </>
                            : <p className='text-center'> - </p>
                    }
                </CardBody>
            </Card> */}
        </div>
    )
}

export default ResumenMontos
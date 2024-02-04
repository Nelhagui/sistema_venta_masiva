import React from 'react'
import {
    Card,
    CardBody
} from "@nextui-org/react";
import { EyeIcon } from '../icons/EyeIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { VerticalDotsIcon } from '../icons/VerticalDotsIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { urls } from '../../config/config';
import fechaUtils from '../../utils/fechaUtils';
import { formatearAMoneda } from '../../utils/utils';

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "nombre",
        label: "NOMBRE",
    },
    {
        key: "telefono",
        label: "TELÉFONO",
    },
    {
        key: "whatsapp",
        label: "WHATSAPP",
    },
    {
        key: "nota",
        label: "NOTA",
    },
    {
        key: "actions",
        label: "ACCIONES",
    },
];

const TablaListVentas = ({ ventas }) => {

    function irPaginaDetalle(cliente_id) {
        window.location.href = `${urls.ventas.detalle}/${cliente_id}`;
    }
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
        console.log("Total Costo:", totalCostoFormateado.split('.')[0]); // Mostrar sin decimales
        console.log("Total Venta:", totalVentaFormateado.split('.')[0]); // Mostrar sin decimales
    } else {
        console.log("Total Costo:", totalCostoFormateado); // Mostrar con decimales
        console.log("Total Venta:", totalVentaFormateado); // Mostrar con decimales
    }

    const diferencia = totalVentaFormateado - totalCostoFormateado;
    const diferenciaFormateada = formatearAMoneda(diferencia);



    return (
        <>
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
            </div>
            <div className='mt-4 p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded shadow-small w-full'>
                <table className='min-w-full h-auto table-auto w-full' >
                    <thead className='[&>tr]:first:rounded-lg'>
                        <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                            <th style={{textAlign: 'left', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white'}} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>FECHA</th>
                            <th style={{textAlign: 'right', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white'}} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>HORA</th>
                            <th style={{textAlign: 'right', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white'}}  className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>TOTAL</th>
                            <th style={{textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white'}} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CAJERO</th>
                            <th style={{textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white'}} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CLIENTE</th>
                            <th style={{textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white'}} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p>{fechaUtils.convertirFormatoFecha(venta?.fecha_hora_venta)}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p style={{textAlign: 'right'}}>{fechaUtils.convertirFormatoHora(venta?.fecha_hora_venta)}</p>
                                </td>
                                <td style={{textAlign: 'right'}} className="py-2 px-3 text-small font-normal">
                                    <p>
                                        ${formatearAMoneda(venta?.monto_total_venta)}
                                    </p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p className='text-center'>{venta?.sesion_caja?.cajero?.nombre}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p className='text-center'>{venta?.cliente?.nombre}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal text-center" style={{display: 'flex', justifyContent: 'center'}}>
                                    <a href={`${urls.ventas.ver}/${venta.id}`} >
                                        <EyeIcon style={{ cursor: 'pointer' }} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TablaListVentas
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    Input
} from "@nextui-org/react";
import { EyeIcon } from '../icons/EyeIcon';
import fechaUtils from '../../utils/fechaUtils';
import { formatearAMoneda } from '../../utils/utils';
import { urls } from '../../config/config';
import ResumenMontos from './detalles/ResumenMontos';


const TablaListVentas = ({ ventas, caja }) => {
    // const location = useLocation();
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        // Obtener el valor de fecha de la query (si existe)
        const params = new URLSearchParams(window.location.search);
        const queryDate = params.get('fecha');
        // Establecer la fecha seleccionada en el estado
        setSelectedDate(queryDate || new Date().toISOString().split('T')[0]);
    }, []);

    


    const handleDateChange = (event) => {
        const newSelectedDate = event.target.value;
        setSelectedDate(newSelectedDate);

        // Actualizar la URL con la nueva fecha
        const url = new URL(window.location.href);
        url.searchParams.set('fecha', newSelectedDate);
        window.location.href = url.toString();
    };


    return (
        <>
            <div className='flex justify-between'>
                <ResumenMontos ventas={ventas} caja={caja}/>
                <div className='flex items-end'>
                    <Input
                        label="Fecha"
                        variant="bordered"
                        defaultValue={selectedDate}
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="max-w-xs"
                        name="fecha"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>
            </div>
            <div className='mt-4 p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded shadow-small w-full'>
                <table className='min-w-full h-auto table-auto w-full' >
                    <thead className='[&>tr]:first:rounded-lg'>
                        <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                            <th style={{ textAlign: 'left', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>FECHA</th>
                            <th style={{ textAlign: 'right', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>HORA</th>
                            <th style={{ textAlign: 'right', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>TOTAL</th>
                            <th style={{ textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CAJERO</th>
                            <th style={{ textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CLIENTE</th>
                            <th style={{ textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p>{fechaUtils.convertirFormatoFecha(venta?.fecha_hora_venta)}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p style={{ textAlign: 'right' }}>{fechaUtils.convertirFormatoHora(venta?.fecha_hora_venta)}</p>
                                </td>
                                <td style={{ textAlign: 'right' }} className="py-2 px-3 text-small font-normal">
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
                                <td className="py-2 px-3 text-small font-normal text-center" style={{ display: 'flex', justifyContent: 'center' }}>
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
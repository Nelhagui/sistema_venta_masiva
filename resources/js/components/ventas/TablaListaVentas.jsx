import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from '../icons/EyeIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { VerticalDotsIcon } from '../icons/VerticalDotsIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { urls } from '../../config/config';
import fechaUtils from '../../utils/fechaUtils';

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

const TablaListaVentas = ({ ventas }) => {

    function irPaginaDetalle(cliente_id) {
        window.location.href = `${urls.ventas.detalle}/${cliente_id}`;
    }

    return (
        <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded shadow-small w-full'>
            <table className='min-w-full h-auto table-auto w-full' >
                <thead className='[&>tr]:first:rounded-lg'>
                    <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                        <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>FECHA</th>
                        <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>HORA</th>
                        <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>TOTAL</th>
                        <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CAJERO</th>
                        <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CLIENTE</th>
                        <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <tr key={index} className='bg-white odd:bg-gray-500'>
                            <td className="py-2 px-3 text-small font-normal">
                                <p>{fechaUtils.convertirFormatoFecha(venta?.fecha_hora_venta)}</p>
                            </td>
                            <td className="py-2 px-3 text-small font-normal">
                                <p>{fechaUtils.convertirFormatoHora(venta?.fecha_hora_venta)}</p>
                            </td>
                            <td className="py-2 px-3 text-small font-normal">
                                <p>${venta?.monto_total_venta}</p>
                            </td>
                            <td className="py-2 px-3 text-small font-normal">
                                <p>{venta?.sesion_caja?.cajero?.nombre}</p>
                            </td>
                            <td className="py-2 px-3 text-small font-normal">
                                <p>{venta?.cliente?.nombre}</p>
                            </td>
                            <td className="py-2 px-3 text-small font-normal">
                                <EyeIcon style={{ cursor: 'pointer' }} />
                                {/* <button onClick={() => console.log('hola')}>Eliminar</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaListaVentas
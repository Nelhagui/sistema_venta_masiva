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

const TablaListClientes = ({ clientes }) => {

    function irPaginaDetalle(cliente_id) {
        window.location.href = `${urls.clientes.detalle}/${cliente_id}`;
    }

    return (
        <Table
            isStriped
            aria-label="Example static collection table"
        >
            <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Telefono</TableColumn>
                <TableColumn>Whatsapp</TableColumn>
                <TableColumn>Nota</TableColumn>
                <TableColumn>Acción</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    clientes.map((cliente) => (
                        <TableRow key={cliente?.id}>
                            <TableCell>{cliente?.nombre}</TableCell>
                            <TableCell>{cliente?.telefono ?? "-"}</TableCell>
                            <TableCell>{cliente?.whatsapp ?? "-"}</TableCell>
                            <TableCell>{cliente?.nota ?? "-"}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Ver cliente">
                                        <a href={`${urls.clientes.detalle}/${cliente?.id}`} >
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </a>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default TablaListClientes
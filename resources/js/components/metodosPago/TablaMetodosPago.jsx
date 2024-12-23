import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Chip
} from "@nextui-org/react";
import { EyeIcon } from '../icons/EyeIcon';
import { urls } from '../../config/config';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import ModalEliminarMetodoPago from './eliminar/ModalEliminarMetodoPago';

const TablaMetodosPago = ({ metodosDePago }) => {
    function irPaginaEditMetodoPago(metodoId) {
        window.location.href = `${urls.metodosDePago.editar}/${metodoId}`;
    }

    return (
        <Table
            isStriped
            aria-label="Example static collection table"
        >
            <TableHeader>
                <TableColumn
                    style={{ backgroundColor: '#999cbe', color: 'white' }}
                >
                    NOMBRE
                </TableColumn>
                <TableColumn
                    style={{ backgroundColor: '#999cbe', color: 'white' }}
                >
                    ESTADO
                </TableColumn>
                <TableColumn
                    style={{ backgroundColor: '#999cbe', color: 'white' }}
                >
                    ACCIÓN
                </TableColumn>
            </TableHeader>
            <TableBody>
                {
                    metodosDePago.map((metodoDePago) => (
                        <TableRow key={metodoDePago?.id}>
                            <TableCell>{metodoDePago?.nombre}</TableCell>
                            <TableCell>
                                {metodoDePago?.predeterminado == 1 ?
                                    <Chip className="capitalize" color="warning" size="sm" variant="flat">
                                        Predeterminado
                                    </Chip>
                                    :
                                    <>
                                        {metodoDePago?.estado == 1 ?
                                            <Chip className="capitalize" color="success" size="sm" variant="flat">
                                                Activo
                                            </Chip>
                                            :
                                            <Chip className="capitalize" color="danger" size="sm" variant="flat">
                                                Inactivo
                                            </Chip>
                                        }
                                    </>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    metodoDePago?.predeterminado == 0 ?
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="Editar">
                                                <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon onClick={() => irPaginaEditMetodoPago(metodoDePago?.id)} />
                                                </span>
                                            </Tooltip>
                                            <Tooltip content="Eliminar">
                                                <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <ModalEliminarMetodoPago item={metodoDePago} />
                                                </span>
                                            </Tooltip>
                                        </div> : <></>
                                }

                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default TablaMetodosPago
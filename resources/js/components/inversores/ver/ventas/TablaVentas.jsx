import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@nextui-org/react";
import { useDetalleClienteContext } from "../../../../context/DetalleClienteContext";
import ResumenDeuda from "./ResumenDeuda";
import fechaUtils from "../../../../utils/fechaUtils";

export default function TablaVentas() {

    const { ventas } = useDetalleClienteContext();

    return (
        <>
            {
                ventas.length > 0
                    ?
                    <div className="flex flex-col gap-3">
                        <ResumenDeuda />
                        <Table
                            color="primary"
                            aria-label="Example static collection table"
                        >
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>FECHA</TableColumn>
                                <TableColumn>HORA</TableColumn>
                                <TableColumn>ABONADO</TableColumn>
                                <TableColumn>VER</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {
                                    ventas.map((venta) => (
                                        <TableRow key={venta.id}>
                                            <TableCell>{venta.id}</TableCell>
                                            <TableCell>
                                                {fechaUtils.convertirFormatoFecha(venta.fecha_hora_venta)}
                                            </TableCell>
                                            <TableCell>
                                                <p>
                                                    {fechaUtils.convertirFormatoHora(venta.fecha_hora_venta)}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <p>
                                                    ${venta.monto_total_venta}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                ver
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div >

                    :
                    <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                        <p className="antialiased font-medium tracking-wide text-center" style={{ fontSize: 22 }}>Sin ventas <span style={{ transform: 'rotate(90deg)', marginLeft: 5 }}>:'(</span></p>
                        <p className="ont-sans text-center mt-2 text-descripcion">Sin ventas <strong>AÚN</strong>. Pronto podrás ver la lista de todas las compras de este cliente.</p>
                    </div>
            }
        </>
    );
}

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
import { useDetalleClienteContext } from "../../../../context/DetalleClienteContext";
import ResumenDeuda from "./ResumenDeuda";
import fechaUtils from "../../../../utils/fechaUtils";
import { EyeIcon } from "../../../icons/EyeIcon";
import { formatearAMoneda } from "../../../../utils/utils";

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
                                                <Popover placement="right">
                                                    <PopoverTrigger>
                                                        <div className="cursor-pointer" >
                                                            <EyeIcon />
                                                        </div>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <div className="px-1 py-2">
                                                            <div className="text-small font-bold mb-1">ITEMS:</div>
                                                            <ul>
                                                                {
                                                                    venta?.detalles?.map(producto => {
                                                                        return (
                                                                            <li key={producto.id}
                                                                                style={{
                                                                                    marginBottom: "3px",
                                                                                    backgroundColor: "#eeeeee",
                                                                                    padding: "5px",
                                                                                    borderRadius: "5px"
                                                                                }}>
                                                                                <div className="flex justify-between">
                                                                                    <div className="text-tiny mr-2">{producto.nombre_producto}</div>
                                                                                    <div className="flex" style={{ marginLeft: '16px' }}>
                                                                                        <div className="text-tiny mr-2">({parseInt(producto.cantidad)})</div>
                                                                                        <div className="text-tiny font-bold" style={{ fontWeight: 'bold' }}>${formatearAMoneda(producto.precio_unitario * producto.cantidad)}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>

                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
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

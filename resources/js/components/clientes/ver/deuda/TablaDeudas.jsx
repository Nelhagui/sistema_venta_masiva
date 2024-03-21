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
import estadoCompraUtils from "../../../../utils/estadoCompraUtils";
import fechaUtils from "../../../../utils/fechaUtils";
import { EyeIcon } from "../../../icons/EyeIcon";
import { formatearAMoneda } from "../../../../utils/utils";

export default function TablaDeudas() {

    const { deudas, keyDeudasSelecionadas, setKeyDeudasSelecionadas } = useDetalleClienteContext();

    return (
        <>
            {
                deudas?.length > 0
                    ?
                    <div className="flex flex-col gap-3">
                        <ResumenDeuda />
                        <Table
                            color="primary"
                            selectionMode="multiple"
                            aria-label="Example static collection table"
                            selectedKeys={keyDeudasSelecionadas}
                            onSelectionChange={setKeyDeudasSelecionadas}
                        >
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>FECHA</TableColumn>
                                <TableColumn>ESTADO</TableColumn>
                                <TableColumn>DEUDA</TableColumn>
                                <TableColumn>DETALLE</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {
                                    deudas?.map((deuda) => (
                                        <TableRow key={deuda.id}>
                                            <TableCell>{deuda.id}</TableCell>
                                            <TableCell>
                                                {fechaUtils.convertirFormatoFechaHora(deuda?.fecha_hora_venta)}
                                            </TableCell>
                                            <TableCell>
                                                <p>
                                                    {estadoCompraUtils.getTextoEstadoCompra(deuda?.estado_pago)}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <p style={{ color: '#ff0000' }}>
                                                    ${Number(deuda?.monto_total_venta) - estadoCompraUtils.calcularMontoTotalPagos(deuda?.pagos)}
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
                                                                    deuda?.detalles?.map(producto => {
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
                                                                                    <div className="flex" style={{ marginLeft: '16px'}}>
                                                                                        <div className="text-tiny mr-2">({parseInt(producto.cantidad)})</div>
                                                                                        <div className="text-tiny font-bold" style={{fontWeight: 'bold' }}>${formatearAMoneda(producto.precio_unitario * producto.cantidad)}</div>
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
                    : <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                        <p className="antialiased font-medium tracking-wide text-center" style={{ fontSize: 22, color: 'green' }}>Está al día</p>
                        <p className="ont-sans text-center mt-2 text-descripcion">Excelente, el usuario no cuenta con deudas.</p>

                    </div>
            }
        </>
    );
}

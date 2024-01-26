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
import estadoCompraUtils from "../../../../utils/estadoCompraUtils";
import fechaUtils from "../../../../utils/fechaUtils";

export default function TablaDeudas() {

    const { deudas, keyDeudasSelecionadas, setKeyDeudasSelecionadas } = useDetalleClienteContext();

    return (
        <>
            <div className="flex flex-col gap-3">
                <ResumenDeuda/>
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
                        <TableColumn>ABONADO</TableColumn>
                        <TableColumn>DEUDA</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            deudas.map((deuda) => (
                                <TableRow key={deuda.id}>
                                    <TableCell>{deuda.id}</TableCell>
                                    <TableCell>
                                        {fechaUtils.convertirFormatoFechaHora(deuda.fecha_hora_venta)}
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            {estadoCompraUtils.getTextoEstadoCompra(deuda.estado_pago)}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        ${estadoCompraUtils.calcularMontoTotalPagos(deuda?.pagos)}
                                    </TableCell>
                                    <TableCell>
                                        <p style={{ color: '#ff0000' }}>
                                            ${Number(deuda.monto_total_venta) - estadoCompraUtils.calcularMontoTotalPagos(deuda?.pagos)}
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div >
        </>
    );
}

import React from "react";
import {
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell
} from "@nextui-org/react";

export default function TablaDeudas() {

  return (
    <div className="flex flex-col gap-3">
      <Table 
        color="primary"
        selectionMode="multiple" 
        defaultSelectedKeys={["2", "3"]} 
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>DEUDA</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

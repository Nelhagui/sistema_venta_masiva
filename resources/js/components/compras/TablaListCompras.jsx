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
    Pagination,
} from "@nextui-org/react";import { SearchIcon } from '../icons/SearchIcon';
import { VerticalDotsIcon } from '../icons/VerticalDotsIcon';
import { PlusIcon } from '../icons/PlusIcon';

const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "proveedor_id",
      label: "PROVEEDOR",
    },
    {
        key: "precio_total",
        label: "PRECIO TOTAL",
    },
    {
        key: "fecha_compra",
        label: "FECHA DE COMPRA",
    },
    {
        key: "fecha_carga",
        label: "FECHA DE CARGA",
    },
    {
        key: "numero_factura",
        label: "NRO FACTURA",
    },
    {
        key: "actions",
        label: "ACCIONES",
    },
];

const TablaListCompras = ({ compras }) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [page, setPage] = React.useState(1);
    
    const rowsPerPage = 30;
    const pages = Math.ceil(compras.length / rowsPerPage);

  
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return compras.slice(start, end);
    }, [page, compras]);

    const renderCell = React.useCallback((compra, columnKey) => {
        const cellValue = compra[columnKey];

        switch (columnKey) {
            case "proveedor_id" :
                return (
                    <span>{compra.proveedor.nombre}</span>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem> 
                                    <a href={`/compras/${compra.id}`}>
                                        Ver
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <a href={"/compras/agregar"}>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Agregar compra
                        </Button>
                    </a>
                </div>
            </div>
        );
    }, []);


    return (
        <Table 
            aria-label="Listado de Compras"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            topContent={topContent}
            topContentPlacement="outside"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
        }
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TablaListCompras
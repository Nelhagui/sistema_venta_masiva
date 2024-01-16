import React from "react";
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
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { PlusIcon } from "../icons/PlusIcon";

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "fecha_venta",
        label: "FECHA",
    },
    {
        key: "created_at",
        label: "HORA",
    },
    {
        key: "monto_total_venta",
        label: "TOTAL",
    },
    {
        key: "user",
        label: "CAJERO",
    },
    {
        key: "detalle",
        label: "DETALLE",
    },
];

const TablaListVentas = ({ ventas }) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [page, setPage] = React.useState(1);

    const rowsPerPage = 30;
    const pages = Math.ceil(ventas.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return ventas.slice(start, end);
    }, [page, ventas]);

    const renderCell = React.useCallback((venta, columnKey) => {
        const cellValue = venta[columnKey];

        switch (columnKey) {
            case "user":
                return <span>{venta.user.nombre}</span>;
            case "detalle":
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
                                    <a href={`/ventas/${venta.id}`}>Ver</a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    return (
        <Table
            aria-label="Listado de Ventas"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
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
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TablaListVentas;

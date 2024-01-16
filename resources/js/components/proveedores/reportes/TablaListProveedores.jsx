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
import { VerticalDotsIcon } from "../../icons/VerticalDotsIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { SearchIcon } from "../../icons/SearchIcon";

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
        key: "direccion",
        label: "DIRECCIÓN",
    },
    {
        key: "actions",
        label: "ACCIONES",
    },
];

const TablaListProveedores = ({ proveedores }) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [page, setPage] = React.useState(1);

    const rowsPerPage = 30;
    const pages = Math.ceil(proveedores.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return proveedores.slice(start, end);
    }, [page, proveedores]);

    const renderCell = React.useCallback((proveedor, columnKey) => {
        const cellValue = proveedor[columnKey];

        switch (columnKey) {
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
                                    <a href={`/reportes/proveedores/compras/${proveedor.id}`}>Ver</a>
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
                    <a href={"/proveedores/agregar"}>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Agregar Proveedor
                        </Button>
                    </a>
                </div>
            </div>
        );
    }, []);


    return (
        <Table
            aria-label="Listado de Ventas"
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

export default TablaListProveedores;

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
} from "@nextui-org/react";
import { SearchIcon } from '../icons/SearchIcon';
import { VerticalDotsIcon } from '../icons/VerticalDotsIcon';
import { PlusIcon } from '../icons/PlusIcon';

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
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [page, setPage] = React.useState(1);
    
    const rowsPerPage = 30;
    const pages = Math.ceil(clientes.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredClients = [...clientes];

        if (hasSearchFilter) {
            filteredClients = filteredClients.filter((cliente) =>
                cliente.nombre.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredClients;
    }, [clientes, filterValue]);


    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const renderCell = React.useCallback((cliente, columnKey) => {
        const cellValue = cliente[columnKey];

        switch (columnKey) {
            case "telefono":
                return (
                    <span>{cliente.telefono || "-"}</span>
                );
            case "whatsapp":
                return (
                    <span>{cliente.whatsapp || "-"}</span>
                );
            case "nota":
                return (
                    <span>{cliente.nota || "-"}</span>
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
                                    <a href={`/clientes/editar/${cliente.id}`}>
                                        Editar
                                    </a>
                                </DropdownItem>
                                <DropdownItem>Eliminar</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        variant="bordered"
                        className="w-full sm:max-w-[44%]"
                        style={{ border: '0' }}
                        placeholder="Escriba nombre del cliente..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <a href={"/clientes/agregar"}>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Agregar Cliente
                        </Button>
                    </a>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        hasSearchFilter,
    ]);

    return (
        <Table
            aria-label="Lista de Clientes"
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

export default TablaListClientes
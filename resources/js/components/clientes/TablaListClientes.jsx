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
    Tooltip,
    Pagination,
} from "@nextui-org/react";
import { EyeIcon } from '../icons/EyeIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { urls } from '../../config/config';
import ModalCrearCliente from './agregar/ModalCrearCliente';
import { EditIcon } from '../icons/EditIcon';

const INITIAL_VISIBLE_COLUMNS = ["nombre", "telefono", "whatsapp", "nota", "acciones"];


const TablaListClientes = ({ clientes }) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });

    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "NOMBRE", uid: "nombre", sortable: true },
        { name: "TELEFONO", uid: "telefono" },
        { name: "WHATSAPP", uid: "whatsapp", sortable: true },
        { name: "NOTA", uid: "nota", sortable: true },
        { name: "ACCIONES", uid: "acciones" },
    ];

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...clientes];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item) =>
                item.nombre.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [clientes, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);


    function irPaginaDetalle(cliente_id) {
        window.location.href = `${urls.clientes.detalle}/${cliente_id}`;
    }

    function irPaginaEditProducto(cliente_id) {
        window.location.href = `${urls.clientes.editar}/${cliente_id}`;
    }

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "nombre":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {item.nombre}
                        </p>
                    </div>
                );
            case "telefono":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {item.telefono ? item.telefono : "-"}
                        </p>
                    </div>
                );
            case "whatsapp":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {item.whatsapp ? item.whatsapp : "-"}
                        </p>
                    </div>
                );
            case "acciones":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Ver">
                            <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => irPaginaDetalle(item?.id)}/>
                            </span>
                        </Tooltip>
                        <Tooltip content="Editar">
                            <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon onClick={() => irPaginaEditProducto(item?.id)} />
                            </span>
                        </Tooltip>
                        {/* <Tooltip color="danger" content="Borrar">
                            <span style={{ cursor: 'pointer' }} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip> */}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mt-10">
                <div className="flex justify-between gap-3 items-end">
                    <div className='w-full'>
                        <Input
                            isClearable
                            variant="bordered"
                            className="max-w-md"
                            placeholder="Buscar por nombre..."
                            startContent={<SearchIcon />}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                            size="sm"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <div className='flex gap-2'>
                            <ModalCrearCliente/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {clientes.length} items</span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por pág.:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                            defaultValue={10}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15" >15</option>
                            <option value="50" >50</option>
                            <option value={clientes.length} >Todos</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onRowsPerPageChange,
        clientes.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previo
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Siguiente
                    </Button>
                </div>
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky={true}
            isStriped
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}

        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={
                            column.uid === "acciones" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"Sin resultados que coincidan"} items={sortedItems}>
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
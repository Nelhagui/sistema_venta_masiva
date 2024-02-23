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
    Tooltip,
    Pagination,
} from "@nextui-org/react";

import { PlusIcon } from "../icons/PlusIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { capitalize, capitalizeToLowerCase } from "../../utils/utils";
import { formatearAMoneda } from "../../utils/utils";
import { EditIcon } from "../icons/EditIcon";
import { urls } from "../../config/config";
import { InventoryIcon } from "../icons/InventoryIcon";


const INITIAL_VISIBLE_COLUMNS = ["titulo", "precio_costo", "precio_venta", "stock_actual", "acciones"];

export default function TablaListProductos({ productos }) {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });

    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "TITULO", uid: "titulo", sortable: true },
        { name: "CODIGO BARRA", uid: "codigo_barra" },
        { name: "PRECIO COSTO", uid: "precio_costo", sortable: true },
        { name: "PRECIO VENTA", uid: "precio_venta", sortable: true },
        { name: "STOCK", uid: "stock_actual", sortable: true },
        { name: "ACCIONES", uid: "acciones" },
    ];

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...productos];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item) => {
                const tituloMatch = item.titulo.toLowerCase().includes(filterValue.toLowerCase());
                const codigoBarraMatch = item.codigo_barra && item.codigo_barra.toString().includes(filterValue);
                return tituloMatch || codigoBarraMatch;
            });
        }
        return filteredUsers;
    }, [productos, filterValue]);

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

    function irPaginaStockPrecio() {
        window.location.href = `${urls.productos.stockPrecio}`
    }

    function irPaginaAgregarProducto() {
        window.location.href = `${urls.productos.crear}`
    }

    function irPaginaEditProducto(productoId) {
        window.location.href = `${urls.productos.editar}/${productoId}`;
    }

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "titulo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {capitalizeToLowerCase(item.titulo)}
                        </p>
                    </div>
                );
            case "precio_costo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {item.precio_costo ? `$${formatearAMoneda(item.precio_costo)}` : "-"}
                        </p>
                    </div>
                );
            case "precio_venta":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {item.precio_venta ? `$${formatearAMoneda(item.precio_venta)}` : "-"}
                        </p>
                    </div>
                );
            case "acciones":
                return (
                    <div className="relative flex items-center gap-2">
                        {/* <Tooltip content="Ver">
                            <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip> */}
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
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <div className='flex gap-2'>
                            <Button
                                className="bg-foreground text-background"
                                endContent={<InventoryIcon />}
                                onPress={() => irPaginaStockPrecio()}
                            >
                                Stock - Precio
                            </Button>
                            <Button
                                className="bg-foreground text-background"
                                // color="danger"
                                endContent={<PlusIcon />}
                                onPress={() => irPaginaAgregarProducto()}
                            >
                                Nuevo Producto
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {productos.length} items</span>
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
                            <option value={productos.length} >Todos</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onRowsPerPageChange,
        productos.length,
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
                        style={{ backgroundColor: '#999cbe', color: 'white' }}
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
    );
}

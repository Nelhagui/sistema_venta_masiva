import React, { useEffect } from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
} from "@nextui-org/react";
import { EyeIcon } from '../../icons/EyeIcon';
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { urls } from '../../../config/config';
import ModalCrearPago from './agregar/ModalCrearPago';
import { EditIcon } from '../../icons/EditIcon';
import fechaUtils from '../../../utils/fechaUtils';
import { formatearAMoneda } from '../../../utils/utils';

const INITIAL_VISIBLE_COLUMNS = ["id", "fecha_pago", "monto_abonado", "nota", "acciones"];

const TablaListPagos = ({ pagos, inversion }) => {

    const inversionMasGanancia = Number(inversion.monto_invertido) * (1 + inversion.porcentaje_ganancia / 100);

    // Calcular el total de los pagos
    const totalPagos = pagos.reduce((total, pago) => total + Number(pago.monto_abonado), 0);
    // Calcular el saldo
    const saldo = Number(inversionMasGanancia) - totalPagos;

    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });

    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "FECHA", uid: "fecha_pago", sortable: true },
        { name: "MONTO", uid: "monto_abonado", sortable: true },
        { name: "NOTA", uid: "nota", sortable: true },
    ];

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...pagos];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item) =>
                item.nombre.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [pagos, filterValue]);

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

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "monto_abonado":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            ${formatearAMoneda(item?.monto_abonado)}
                        </p>
                    </div>
                );
            case "fecha_pago":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {fechaUtils.convertirFormatoFecha(item?.fecha_pago)}
                        </p>
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

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mt-10">
                <div className="flex justify-between gap-3 items-end">
                    <div className='w-full'>
                        <div className="my-9" style={{ marginTop: 25, marginBottom: 25, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h2 className="antialiased font-medium tracking-wide text-left" style={{ fontSize: 32 }}>
                                    Pagos Realizados a Inversión
                                </h2>
                                <div className='flex mt-1 gap-4'>
                                    <div>
                                        <span style={{fontWeight: 'bold'}}> Inversión: </span>${formatearAMoneda(inversion.monto_invertido)}
                                    </div>
                                    <div>
                                        <span style={{fontWeight: 'bold'}}> Ganancia: </span>${formatearAMoneda(inversion.porcentaje_ganancia * inversion.monto_invertido / 100)}
                                    </div>
                                    <div>
                                        <span style={{fontWeight: 'bold'}}> Inversión + Ganancia: </span>${formatearAMoneda(inversionMasGanancia)}
                                    </div>
                                </div>
                                <div className='flex mt-6 gap-2'>
                                    <Chip variant="bordered">
                                        Pagos: ${formatearAMoneda(totalPagos)}
                                    </Chip>
                                    <Chip variant="bordered">
                                        Saldo: ${formatearAMoneda(saldo)}
                                    </Chip>
                                </div>
                            </div>
                        </div>
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
                        {
                            saldo > 0
                                ?
                                <div className='flex gap-2'>
                                    <ModalCrearPago id={inversion.id} />
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {pagos.length} items</span>
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
                            <option value={pagos.length} >Todos</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onRowsPerPageChange,
        pagos.length,
        onSearchChange,
        hasSearchFilter,
        inversion
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
            <TableBody emptyContent={"No se registra ningún pago"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TablaListPagos
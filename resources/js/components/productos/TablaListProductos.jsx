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
      key: "titulo",
      label: "NOMBRE",
    },
    {
        key: "precio_costo",
        label: "PRECIO COSTO",
    },
    {
        key: "precio_venta",
        label: "PRECIO VENTA",
    },
    {
        key: "stock_actual",
        label: "STOCK",
    },
    {
        key: "codigo_barra",
        label: "CÓDIGO BARRA",
    },
    {
        key: "actions",
        label: "ACCIONES",
    },
];

const TablaListProductos = ({ productos }) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [page, setPage] = React.useState(1);
    
    const rowsPerPage = 30;
    const pages = Math.ceil(productos.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...productos];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((producto) =>
                producto.titulo.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredProducts;
    }, [productos, filterValue]);
  
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const renderCell = React.useCallback((producto, columnKey) => {
        const cellValue = producto[columnKey];

        switch (columnKey) {
            case "codigo_barra":
                return (
                    <span>{producto.codigo_barra || "-"}</span>
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
                                    <a href={`/productos/editar/${producto.id}`}>
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
                        className="w-full sm:max-w-[44%]"
                        style={{ border: '0' }}
                        placeholder="Escriba nombre del producto..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <a href={"/productos/agregar"}>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Agregar Producto
                        </Button>
                    </a>
                    <a href={"/productos/update/stock"}>
                        <Button color="danger" endContent={<PlusIcon />}>
                            Cargar Stock de Productos
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
            aria-label="Lista de Productos"
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

export default TablaListProductos
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
    Chip,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
} from "@nextui-org/react";
import { SearchIcon } from '../../icons/SearchIcon';
import { VerticalDotsIcon } from '../../icons/VerticalDotsIcon';
import { PlusIcon } from '../../icons/PlusIcon';

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
        key: "apellido",
        label: "APELLIDO",
    },
    {
        key: "estado",
        label: "ESTADO",
    },
    {
        key: "actions",
        label: "ACCIONES",
    },
];

const statusColorMap = {
    1: "success",
    0: "danger",
  };

const TablaListInversores = ({ inversores }) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [page, setPage] = React.useState(1);
    
    const rowsPerPage = 30;
    const pages = Math.ceil(inversores.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...inversores];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((producto) =>
                producto.nombre.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredProducts;
    }, [inversores, filterValue]);
  
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const renderCell = React.useCallback((inversor, columnKey) => {
        const cellValue = inversor[columnKey];

        switch (columnKey) {
            case "estado":
                return (
                    <Chip className="capitalize" color={statusColorMap[inversor.estado]} size="sm" variant="flat">
                        {cellValue == 1 ? "Activo" : "Inactivo"}
                    </Chip>
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
                                    <a href={`/inversores/editar/${inversor.id}`}>
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
                        placeholder="Escriba nombre del Inversor..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        variant="bordered"
                        onValueChange={onSearchChange}
                    />
                    <a href={"/inversores/agregar"}>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Agregar Inversor
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
            aria-label="Lista de Inversores"
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

export default TablaListInversores
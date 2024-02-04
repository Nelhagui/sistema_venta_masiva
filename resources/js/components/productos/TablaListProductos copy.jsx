import React, {useState} from 'react'
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
    Tooltip
} from "@nextui-org/react";
import { SearchIcon } from '../icons/SearchIcon';
import { VerticalDotsIcon } from '../icons/VerticalDotsIcon';
import { InventoryIcon } from '../icons/InventoryIcon';
import { UploadFileIcon } from '../icons/UploadFileIcon';
import { urls } from '../../config/config';
import { PlusIcon } from '../icons/PlusIcon';
import { EyeIcon } from '../icons/EyeIcon';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';


const TablaListProductos = ({ productos }) => {
    const [productosFiltrados, setProductosFiltrados] = useState(productos);
    const [busqueda, setBusqueda] = React.useState("");
    let debounceTimer;

    // Función para manejar el cambio en el campo de búsqueda
    const handleChangeBusqueda = (event) => {
        const { value } = event.target;
        console.log(value)
        setBusqueda(value);
        // Limpiar el temporizador anterior si existe
        // clearTimeout(debounceTimer);
        // // Configurar un nuevo temporizador
        // debounceTimer = setTimeout(() => {
        //     console.log('avl', value)
        //     // Filtrar la lista de productos basándose en la búsqueda
        //     const productosFiltrados = productos.filter(producto =>
        //         producto.titulo.toLowerCase().includes(value.toLowerCase())
        //     );
        //     setProductosFiltrados(productosFiltrados);
        // }, 500); // Esperar 500 milisegundos antes de ejecutar la búsqueda
    };


    // Función para limpiar la búsqueda y mostrar la lista completa
    const handleClearBusqueda = () => {
        setBusqueda('');
        setProductosFiltrados(productos);
    };

    function irPaginaEditProducto(producto_id) {
        window.location.href = `${urls.productos.editar}/${producto_id}`;
    }

    function irPaginaStockPrecio() {
        window.location.href = `${urls.productos.stockPrecio}`
    }

    function irPaginaAgregarProducto() {
        window.location.href = `${urls.productos.crear}`
    }

    const handleMouseEnter = (index) => {
        const rows = document.querySelectorAll('tbody > tr');
        rows[index].classList.add('row-hover');
    };

    const handleMouseLeave = (index) => {
        const rows = document.querySelectorAll('tbody > tr');
        rows[index].classList.remove('row-hover');
    };

    return (
        <div className='mt-10'>
            <div className='flex justify-between'>
                <div className='w-full'>
                    <Input
                        isClearable
                        type="text"
                        variant="bordered"
                        size='sm'
                        placeholder="Buscar por nombre..."
                        onClear={() => handleClearBusqueda}
                        onChange={handleChangeBusqueda}
                        value={busqueda}
                        className="max-w-md"
                        startContent={
                            <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                </div>
                <div className='flex gap-2'>
                    <Button
                        className="bg-foreground text-background"
                        // color="danger"
                        endContent={<InventoryIcon />}
                        onPress={() => irPaginaStockPrecio()}
                    >
                        Stock - Precio
                    </Button>

                    <Button
                        className="bg-foreground text-background"
                        // color="danger"
                        endContent={<UploadFileIcon />}
                        onPress={() => irPaginaAgregarProducto()}
                    >
                        Subir Productos
                    </Button>
                </div>
            </div>

            <div className='mt-4 p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded shadow-small w-full'>
                <table className='min-w-full h-auto table-auto w-full' >
                    <thead className='[&>tr]:first:rounded-lg'>
                        <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                            <th style={{ textAlign: 'left', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>NOMBRE</th>
                            <th style={{ textAlign: 'right', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>PRECIO COSTO</th>
                            <th style={{ textAlign: 'right', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>PRECIO VENTA</th>
                            <th style={{ textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>STOCK</th>
                            <th style={{ textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CÓDIGO BARRA</th>
                            <th style={{ textAlign: 'center', backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 text-rigth align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((producto, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? 'odd-row' : 'even-row'}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <td className="py-2 px-3 text-small font-normal">
                                    <p>{producto?.titulo}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p style={{ textAlign: 'right' }}>{producto?.precio_costo}</p>
                                </td>
                                <td style={{ textAlign: 'right' }} className="py-2 px-3 text-small font-normal">
                                    <p>
                                        {producto?.precio_venta}
                                    </p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p className='text-center'>{producto?.stock_actual}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal">
                                    <p className='text-center'>{producto?.codigo_barra}</p>
                                </td>
                                <td className="py-2 px-3 text-small font-normal text-center" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Ver">
                                            <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Editar">
                                            <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon onClick={() => irPaginaEditProducto(producto?.id)} />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Borrar">
                                            <span style={{ cursor: 'pointer' }} className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablaListProductos
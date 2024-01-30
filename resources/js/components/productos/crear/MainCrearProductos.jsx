import { createRoot } from 'react-dom/client';
import { Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import productoServices from '../../../services/productoServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
    {
        key: "name",
        label: "TÍTULO",
    },
    {
        key: "codigo_barra",
        label: "CÓDIGO BARRA",
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
    }
];

export default function MainCrearProductos() {
    const [nuevosProductos, setNuevosProductos] = useState([
        {
            key: Math.random(),
            titulo: '',
            codigo_barra: '',
            precio_costo: '',
            precio_venta: '',
            stock_actual: '',
            highlighted: false,
        }
    ]);
    const [isLoading, setIsLoading] = useState(false)
    const [errores, setErrores] = useState([]); 

    useEffect(() => {
        console.log(errores)
    }, [errores])

    const handleInputChangeProducto = (id, campo, valor) => {
    
        setNuevosProductos(prevNuevosProductos => {
            return prevNuevosProductos.map(nuevoProducto => {
                if (nuevoProducto.key === id) {
                    return actualizarProducto(nuevoProducto, campo, valor);
                }
                return nuevoProducto;
            });
        });
    };
    
    const actualizarProducto = (producto, campo, valor) => {
        let updatedProducto = {
            ...producto,
            [campo]: valor 
        };
    
        // Si el campo que se está modificando es "precio_costo", actualizamos "precio_venta"
        if (campo === 'precio_costo') {
            const porcentaje = 1.50; // Aumentamos en un 10%
            const nuevoPrecio = valor * porcentaje;
            updatedProducto.precio_venta = `${(Math.round(nuevoPrecio / 5) * 5)}.00`;
        }
    
        return updatedProducto;
    };


    const handleConfirmCompra = () => {
        handleSubmit();
    };


    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await productoServices.crear(nuevosProductos);
            toast.success('Compra realizada con éxito', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setNuevosProductos([
                {
                    key: Math.random(),
                    titulo: '',
                    codigo_barra: '',
                    precio_costo: '',
                    precio_venta: '',
                    stock_actual: '',
                    highlighted: false,
                }
            ]);
        } catch (error) {
            setErrores(error.errors)
        } finally {
            setIsLoading(false);
        }
    };


    const agregarProductoNuevo = () => {

        // Crea un nuevo producto con valores iniciales o vacíos
        const nuevoProducto = {
            key: Math.random(),
            titulo: '',
            codigo_barra: '',
            precio_costo: '',
            precio_venta: '',
            stock_actual: '',
            highlighted: false,
        };

        // Agrega el nuevo producto a la lista de productos seleccionados
        setNuevosProductos([...nuevosProductos, nuevoProducto]);
        console.log(nuevosProductos)
    }

    return (
        <>
            <div className='d-flex' style={{textAlign: 'end', marginBlock: '0 10px'}}>
                <Button color="danger" onClick={() => { handleConfirmCompra() }}>Cargar Compra</Button>
            </div>
           <Table aria-label="Tabla para crear productos">
                <TableHeader columns={columns}>
                    <TableColumn>TÍTULO</TableColumn>
                    <TableColumn>CÓDIGO BARRA</TableColumn>
                    <TableColumn>PRECIO COSTO</TableColumn>
                    <TableColumn>PRECIO VENTA</TableColumn>
                    <TableColumn>STOCK</TableColumn>
                </TableHeader>
                <TableBody>
                {
                    nuevosProductos.map((producto) =>
                    (
                        <TableRow key={producto.key}>
                            <TableCell>
                                <Input
                                    variant="bordered" 
                                    isInvalid={false}
                                    type="text"
                                    value={producto.titulo}
                                    errorMessage={false}
                                    labelPlacement="outside"
                                    isRequired
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'titulo', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    variant="bordered" 
                                    isInvalid={false}  
                                    type="number"
                                    value={producto.codigo_barra}
                                    name="codigo_barra"
                                    labelPlacement="outside"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'codigo_barra', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    variant="bordered" 
                                    isInvalid={false}
                                    type="number"
                                    labelPlacement="outside"
                                    value={producto.precio_costo}
                                    name="precio_costo"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'precio_costo', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    variant="bordered" 
                                    isInvalid={false}
                                    type="number"
                                    labelPlacement="outside"
                                    value={producto.precio_venta}
                                    name="precio_venta"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'precio_venta', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    variant="bordered" 
                                    isInvalid={false}
                                    type="number"
                                    name="stock_actual"
                                    value={producto.stock_actual}
                                    labelPlacement="outside"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'stock_actual', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    )
                    )
                }
                </TableBody>
            </Table> 
            <div className='d-flex text-center mt-4'>
                <Button variant="ghost" onClick={() => { agregarProductoNuevo() }}>Agregar Nuevo Producto</Button>
            </div>
        </>
    )
}

if (document.getElementById('mainCrearProductos')) {
    const domNode = document.getElementById('mainCrearProductos');
    const root = createRoot(domNode);
    root.render(<MainCrearProductos />);
}
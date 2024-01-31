import { createRoot } from 'react-dom/client';
import { Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import productoServices from '../../../services/productoServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainCrearProductos() {
    const nuevoProducto = {
        key: Math.random(),
        titulo: '',
        codigo_barra: '',
        precio_costo: '',
        precio_venta: '',
        stock_actual: '',
        highlighted: false,
    };
    const [nuevosProductos, setNuevosProductos] = useState([nuevoProducto]);
    const [isLoading, setIsLoading] = useState(false)
    const [errores, setErrores] = useState([]);

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
            const response = await productoServices.crear(nuevosProductos);
            const data = await response.json();
            if (response.status !== 200) {
                if(data?.errors?.length > 0){
                    let objetoResultado = {};
                    data.errors.forEach(error => {
                        objetoResultado[`${error.key}-${error.campo}`] = error.error;
                    });
                    setErrores(objetoResultado);
                    console.log('bucleando')
                    console.log(errores)
                } else {
                    console.log('error inesperado');
                }
            } else {
                toast.success('Productos cargados exitosamente', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setErrores([]);
                setNuevosProductos([nuevoProducto]);
            }
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
      console.log(errores)
    }, [errores])


    const agregarProductoNuevo = () => {
        setNuevosProductos([...nuevosProductos, nuevoProducto]);
        console.log(nuevosProductos)
    }


    return (
        <>
            <div className='d-flex' style={{textAlign: 'end', marginBlock: '0 10px'}}>
                <Button color="danger" onClick={() => { handleConfirmCompra() }}>Cargar Compra</Button>
            </div>
           <Table aria-label="Tabla para crear productos">
                <TableHeader>
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
                                    type="text"
                                    value={producto.titulo}
                                    labelPlacement="outside"
                                    isRequired
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'titulo', e.target.value)}
                                    errorMessage={errores[`${producto.key}-titulo`] ? errores[`${producto.key}-titulo`] : ""}
                                    isInvalid={errores[`${producto.key}-titulo`] ? true : false}

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
                                    type="number"
                                    labelPlacement="outside"
                                    value={producto.precio_costo}
                                    name="precio_costo"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'precio_costo', e.target.value)}
                                    errorMessage={errores[`${producto.key}-precio_costo`] ? errores[`${producto.key}-precio_costo`] : ""}
                                    isInvalid={errores[`${producto.key}-precio_costo`] ? true : false}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    variant="bordered"
                                    type="number"
                                    labelPlacement="outside"
                                    value={producto.precio_venta}
                                    name="precio_venta"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'precio_venta', e.target.value)}
                                    errorMessage={errores[`${producto.key}-precio_venta`] ? errores[`${producto.key}-precio_venta`] : ""}
                                    isInvalid={errores[`${producto.key}-precio_venta`] ? true : false}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    variant="bordered"
                                    type="number"
                                    name="stock_actual"
                                    value={producto.stock_actual}
                                    labelPlacement="outside"
                                    onChange={(e) => handleInputChangeProducto(producto.key, 'stock_actual', e.target.value)}
                                    errorMessage={errores[`${producto.key}-stock_actual`] ? errores[`${producto.key}-stock_actual`] : ""}
                                    isInvalid={errores[`${producto.key}-stock_actual`] ? true : false}
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
            <ToastContainer />
        </>
    )
}

if (document.getElementById('mainCrearProductos')) {
    const domNode = document.getElementById('mainCrearProductos');
    const root = createRoot(domNode);
    root.render(<MainCrearProductos />);
}
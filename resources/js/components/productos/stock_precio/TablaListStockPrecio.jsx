import React, { useState, useEffect, useRef, useCallback } from 'react'
import { capitalizeFirstLetterOfEachWord } from '../../../utils/capitalizeFirstLetterOfEachWord';
import { debounce } from '../../../utils/debounce';
import { Input, Select, SelectItem, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { SearchIcon } from '../../icons/SearchIcon';
import productoServices from '../../../services/productoServices';
import { toast } from 'react-toastify';

// Estilo de resaltado
const highlightedStyle = {
    backgroundColor: 'green',
    transition: 'background-color 2s ease', // Animación de transición
};

const TablaListStockPrecio = ({productos, inversores, proveedores}) => {
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const productosInicialesRef = useRef([]);
    const nuevoProducto = {
        key: Math.random(),
        titulo: '',
        codigo_barra: '',
        precio_costo: '',
        precio_venta: '',
        stock_actual: '',
        usar_control_por_lote: false,
        fecha_vencimiento: '',
        inversor_id: '',
        highlighted: false,
    };

    useEffect(() => {
        productosInicialesRef.current = productosIniciales;
    }, [productosIniciales]);

    const [isLoading, setIsLoading] = useState(false)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [nuevosProductos, setNuevosProductos] = useState([nuevoProducto]);
    const [datosCompra, setDatosCompra] = useState({
        fechaCompra: "",
        proveedor: "",
        nroFactura: ""
    })
    const [errores, setErrores] = useState([])

    useEffect(() => {
        if (inputRef.current) {
            focusInput();
        }
    }, []);


    const focusInput = () => inputRef.current.focus();

    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.select(); // Seleccionar todo el contenido del input
        }
    };

    const reset = () => {
        focusInput();
        setObjetosBuscados([]);
        setInputText('')
    }

    // BUSCADOR
    const handleInputChange = (e) => {
        setIsLoading(true)
        const value = e.target.value;
        setInputText(value);
        debouncedSearchRef.current(value);
    }

    const handleChangeDatosCompra = (e) => {
        const { name, value } = e.target
        setDatosCompra({ ...datosCompra, [name]: value })
        console.log(datosCompra)

    }

    const realizarBusqueda = (textoBusqueda) => {
        const productosActuales = productosInicialesRef.current;

        const MAX_PRODUCTOS = 30;
        if (textoBusqueda === '') {
            setObjetosBuscados([]);
        } else {
            if (/^\d+$/.test(textoBusqueda)) {
                const productoEncontrado = productosActuales.find((producto) => Number(producto.codigo_barra) === Number(textoBusqueda));
                if (productoEncontrado) {
                    addProducto(productoEncontrado)
                } else {
                    setObjetosBuscados([]);
                    handleInputFocus();
                }
            } else {
                const productosCoincidentes = productosActuales
                    .filter((producto) => producto.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()))
                    .slice(0, MAX_PRODUCTOS);
                setObjetosBuscados(productosCoincidentes);
            }
        }
        setIsLoading(false)
    }

    const debouncedSearchRef = useRef(debounce((textoBusqueda) => realizarBusqueda(textoBusqueda), 200));

    const addProducto = (producto) => {
        setProductosSeleccionados(prevProductos => {
            const productoExistente = prevProductos.find(p => p.titulo === producto.titulo);

            if (productoExistente) {
                // Si el producto ya existe, incrementamos su stock en 1 y le agregamos el efecto highlighted
                setTimeout(() => {
                    setProductosSeleccionados((prevProductos) =>
                        prevProductos.map((p) =>
                            p.titulo === producto.titulo
                                ? { ...p, highlighted: false }
                                : p
                        )
                    );
                }, 1000);
                return prevProductos.map(p => {
                    if (p.titulo === productoExistente.titulo) {
                        return {
                            ...p,
                            stock_actual: p.stock_actual + 1,
                            highlighted: true
                        };
                    }
                    return p;
                });
            } else {
                let newProducto = {
                    ...producto,
                    highlighted: true,
                    stock_actual: 1,
                    precio_costo: 99999,
                    precio_venta: 99999,
                    usar_control_por_lote: false,
                    habilitado: true,
                };

                // Si hay productos previamente seleccionados, copia los atributos relevantes del último producto
                if (prevProductos.length > 0) {
                    const ultimoProducto = prevProductos[0]; // Dado que estás agregando al inicio, el último producto sería el primer elemento

                    newProducto.usar_control_por_lote = ultimoProducto.usar_control_por_lote;
                    newProducto.fecha_vencimiento = ultimoProducto.fecha_vencimiento;
                    newProducto.proveedor_id = ultimoProducto.proveedor_id;
                    newProducto.numero_factura = ultimoProducto.numero_factura;
                }

                setTimeout(() => {
                    setProductosSeleccionados((prevProductos) =>
                        prevProductos.map((p) =>
                            p.titulo === producto.titulo
                                ? { ...p, highlighted: false }
                                : p
                        )
                    );
                }, 1000);

                return [newProducto, ...prevProductos];
            }
        });
        reset();
    };

    const handleInputChangeProducto = (id, campo, valor) => {
        setProductosSeleccionados(prevProductos => {
            return prevProductos.map(producto => {
                if (producto.id === id) {
                    return actualizarProducto(producto, campo, valor);
                }
                return producto;
            });
        });
    
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
            const response = await productoServices.cargarCompra(productosSeleccionados, datosCompra, nuevosProductos);
            const data = await response.json();

            if (response.status !== 200) {
                if(data?.errors?.length > 0){
                    let objetoResultado = {};
                    data.errors.forEach(error => {
                        objetoResultado[`${error.key}-${error.campo}`] = error.error;
                    });
                    setErrores(objetoResultado);
                    console.log(errores)
                    console.log("bucleando")
                } else {
                    console.log('error inesperado');
                }
            } else {
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
                setProductosSeleccionados([]);
                setNuevosProductos([nuevoProducto]);
                setDatosCompra({
                    fechaCompra: "",
                    proveedor: "",
                    nroFactura: ""
                })
            }
        } catch (error) {
            // Maneja el error si la creación de la compra falla
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
            {/* BUSCADOR */}
            <div style={styles.listContainer}>
                <div className='flex justify-between my-auto'>
                    <div className='flex gap-4'>
                        <Input
                            isClearable
                            variant="bordered"
                            className="w-full sm:max-w-[44%]"
                            placeholder="Ingrese el código de barras o título"
                            startContent={<SearchIcon />}
                            value={inputText}
                            ref={inputRef}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            style={{ minWidth: '450px' }}
                        /> 
                        {/* <span style={{ marginLeft: 18, color: 'green' }}>{productosSeleccionados?.length > 0 ? `Productos: ${productosSeleccionados?.length}` : ''}</span> */}
                    </div>
                    {
                        (productosSeleccionados.length > 0 || nuevosProductos.length > 0 ) &&
                        <>
                            
                            <div style={{ display: 'flex', marginTop: '-1.5em', gap: '.5em' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Input
                                        variant="faded"
                                        type="date"
                                        name='fechaCompra'
                                        label="Fecha de compra"
                                        labelPlacement="outside"
                                        placeholder="."
                                        onChange={handleChangeDatosCompra}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Select
                                        label="Proveedor"
                                        labelPlacement="outside"
                                        placeholder="Seleccione proveedor"
                                        name="proveedor"
                                        style={{ minWidth: '150px' }}
                                        onChange={handleChangeDatosCompra}
                                    >
                                        {proveedores.map((proveedor) => (
                                            <SelectItem key={proveedor.id} value={proveedor.id}>
                                                {proveedor.nombre}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Input
                                        variant="faded"
                                        type="text"
                                        name='nroFactura'
                                        label="Número de Factura"
                                        labelPlacement="outside"
                                        placeholder="Nro de Factura"
                                        onChange={handleChangeDatosCompra}
                                    />
                                </div>
                            </div>

                            <div>
                                <Button color="danger" onClick={() => { handleConfirmCompra() }}>Cargar Compra</Button>
                            </div>
                        </>
                    }
                    
                </div>

                <ul style={inputText ? styles.productosListWithBorder : styles.productosList}>
                    {
                        objetosBuscados.length > 0
                            ? (
                                objetosBuscados.map((producto) => (
                                    <li key={producto.titulo} style={styles.containerRowProducto} className='border-t border-b' onClick={() => { addProducto(producto) }}>
                                        <p style={styles.productoTitulo}>{producto.titulo}</p>
                                        <p style={styles.productoPrecioVenta}>{producto.precio_venta ? `$${producto.precio_venta}` : ''}</p>
                                    </li>
                                ))
                            ) : (
                                inputText && !isLoading ? <li style={{ textAlign: 'center', padding: 8, backgroundColor: '#e2e2e2' }}>Sin Resultados</li> : ''
                            )}
                </ul>
            </div>
            {/* FIN BUSCADOR */}


            {
                (productosSeleccionados.length > 0 || nuevosProductos.length > 0) &&
                <>
                    <Table aria-label="Tabla de Stock y Precio de productos">
                        <TableHeader>
                            <TableColumn>TÍTULO</TableColumn>
                            <TableColumn>CÓDIGO BARRA</TableColumn>
                            <TableColumn>PRECIO COSTO</TableColumn>
                            <TableColumn>PRECIO VENTA</TableColumn>
                            <TableColumn>STOCK</TableColumn>
                            <TableColumn>CONTROL POR LOTE</TableColumn>
                            <TableColumn>FECHA VENCIMIENTO</TableColumn>
                            <TableColumn>INVERSOR</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {productosSeleccionados.map(( producto ) => (
                                <TableRow key={producto.id}>
                                    <TableCell>
                                        {capitalizeFirstLetterOfEachWord(producto.titulo)}
                                    </TableCell>
                                    <TableCell>
                                        {producto.codigo_barra}
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="bordered"
                                            type="number"
                                            name='precio_costo'
                                            labelPlacement="outside"
                                            value={producto.precio_costo}
                                            onChange={(e) => handleInputChangeProducto(producto.id, 'precio_costo', e.target.value)}
                                            errorMessage={errores[`${producto.id}-precio_costo`] ? errores[`${producto.id}-precio_costo`] : ""}
                                            isInvalid={errores[`${producto.id}-precio_costo`] ? true : false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="bordered"
                                            type="number"
                                            name='precio_venta'
                                            labelPlacement="outside"
                                            value={producto.precio_venta}
                                            onChange={(e) => handleInputChangeProducto(producto.id, 'precio_venta', e.target.value)}
                                            errorMessage={errores[`${producto.id}-precio_venta`] ? errores[`${producto.id}-precio_venta`] : ""}
                                            isInvalid={errores[`${producto.id}-precio_venta`] ? true : false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="bordered"
                                            type="number"
                                            name='stock_actual'
                                            labelPlacement="outside"
                                            value={producto.stock_actual}
                                            onChange={(e) => handleInputChangeProducto(producto.id, 'stock_actual', e.target.value)}
                                            errorMessage={errores[`${producto.id}-stock_actual`] ? errores[`${producto.id}-stock_actual`] : ""}
                                            isInvalid={errores[`${producto.id}-stock_actual`] ? true : false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            value={producto.usar_control_por_lote}
                                            name='usar_control_por_lote'
                                            onValueChange={(event) => handleInputChangeProducto(producto.id, 'usar_control_por_lote', event)}
                                        ></Checkbox>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="bordered"
                                            type="date"
                                            textValue={producto.fecha_vencimiento || ''}
                                            name='fecha_vencimiento'
                                            labelPlacement="outside"
                                            onChange={(e) => handleInputChangeProducto(producto.id, 'fecha_vencimiento', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select 
                                            label="Seleccione" 
                                            className="max-w-xs" 
                                            variant="faded"
                                            style={{ minWidth: '150px' }}
                                            onChange={(e) => handleInputChangeProducto(producto.id, 'inversor', e.target.checked)}
                                        >
                                            {inversores.map((inversor) => (
                                            <SelectItem key={inversor.id} value={inversor.id}>
                                                {inversor.nombre + " " + inversor.apellido} 
                                            </SelectItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
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
                                                onChange={(e) => handleInputChangeProducto(producto.key, 'titulo', e.target.value)}
                                                errorMessage={errores[`${producto.key}-titulo`] ? errores[`${producto.key}-titulo`] : ""}
                                                isInvalid={errores[`${producto.key}-titulo`] ? true : false}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="bordered"
                                                type="number"
                                                value={producto.codigo_barra}
                                                name="codigo_barra"
                                                labelPlacement="outside"
                                                onChange={(e) => handleInputChangeProducto(producto.key, 'codigo_barra', e.target.value)}
                                                errorMessage={errores[`${producto.key}-codigo_barra`] ? errores[`${producto.key}-codigo_barra`] : ""}
                                                isInvalid={errores[`${producto.key}-codigo_barra`] ? true : false}
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
                                        <TableCell>
                                            <Checkbox
                                                value={producto.usar_control_por_lote}
                                                onValueChange={(event) => handleInputChangeProducto(producto.key, 'usar_control_por_lote', event)}
                                            ></Checkbox>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="date"
                                                name="fecha_nacimiento"
                                                value={producto.fecha_vencimiento}
                                                labelPlacement="outside"
                                                onChange={(e) => handleInputChangeProducto(producto.key, 'fecha_vencimiento', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select 
                                                label="Seleccione" 
                                                className="max-w-xs" 
                                                variant="faded"
                                                value={producto.inversor_id}
                                                style={{ minWidth: '150px' }}
                                                onValueChange={(e) => handleInputChangeProducto(producto.key, 'inversor_id', e.target.value)}
                                            >
                                                {inversores.map((inversor) => (
                                                <SelectItem key={inversor.id} value={inversor.id}>
                                                    {inversor.nombre + " " + inversor.apellido} 
                                                </SelectItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                )
                                )
                            }
                        </TableBody>
                    </Table>
                </>

            }

            <div className='d-flex text-center mt-4'>
                <Button variant="ghost" onClick={() => { agregarProductoNuevo() }}>Agregar Nuevo Producto</Button>
            </div>

        </>
    )
}

const styles = {
    listContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    productosList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        minWidth: '450px',
        maxHeight: '200px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        zIndex: 1,
    },
    containerRowProducto: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        backgroundColor: "#fff",
    },
    productoTitulo: {
        fontSize: '10pt',
    },
    productoPrecioVenta: {
        fontSize: "9pt",
    }
};

styles.productosListWithBorder = {
    ...styles.productosList,
    border: '1px solid #ccc',
};

export default TablaListStockPrecio
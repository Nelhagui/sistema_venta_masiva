import React, { useState, useEffect, useRef, useCallback } from 'react'
import { capitalizeFirstLetterOfEachWord } from '../../utils/capitalizeFirstLetterOfEachWord';
import { debounce } from '../../utils/debounce';
import { Input, Select, SelectItem, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { SearchIcon } from '../icons/SearchIcon';

// Estilo de resaltado
const highlightedStyle = {
    backgroundColor: 'green',
    transition: 'background-color 2s ease', // Animación de transición
};

const TablaListCompras = () => {
    const [productosIniciales, setProductosIniciales] = useState([])
    const productosInicialesRef = useRef([]);

    useEffect(() => {
        productosInicialesRef.current = productosIniciales;
    }, [productosIniciales]);

    const [proveedores, setProveedores] = useState([])
    const [inversores, setInversores] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingProveedores, setIsLoadingProveedores] = useState(true)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [nuevosProductos, setNuevosProductos] = useState([]);
    const [datosCompra, setDatosCompra] = useState({
        fechaCompra: "",
        proveedor: "",
        nroFactura: ""
    })

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
            key: "stock",
            label: "STOCK",
        },
        {
            key: "control_por_lote",
            label: "CONTROL POR LOTE",
        },
        {
            key: "fecha_vencimiento",
            label: "FECHA VENCIMIENTO",
        },
        {
            key: "inversor",
            label: "INVERSOR",
        },
    ];

    useEffect(() => {
        if (inputRef.current) {
            focusInput();
        }

        fetch('/api/proveedores')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de productos
                setProveedores(data);
            })
            .finally(() => {
                setIsLoadingProveedores(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        fetch('/api/productos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de productos
                setProductosIniciales(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })

        fetch('/api/inversores')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de productos
                setInversores(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })

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
                            stock: p.stock + 1,
                            highlighted: true
                        };
                    }
                    return p;
                });
            } else {
                let newProducto = {
                    ...producto,
                    highlighted: true,
                    stock: 1,
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

    const handleInputChangeProducto = (titulo, campo, valor) => {
        setProductosSeleccionados(prevProductos => {
            return prevProductos.map(producto => {
                if (producto.titulo === titulo) {
                    let updatedProducto = {
                        ...producto,
                        [campo]: valor
                    };

                    // Si usar_control_por_lote se desactiva, borramos fecha_vencimiento
                    if (campo === 'usar_control_por_lote' && !valor) {
                        updatedProducto.fecha_vencimiento = '';
                        updatedProducto.proveedor_id = '';
                        updatedProducto.numero_factura = '';
                    }

                    // Si el campo que se está modificando es "precio_costo", actualizamos "precio_venta"
                    if (campo === 'precio_costo') {
                        const porcentaje = 1.50; // Aumentamos en un 10%
                        const nuevoPrecio = valor * porcentaje;
                        updatedProducto.precio_venta = `${(Math.round(nuevoPrecio / 5) * 5)}.00`;
                    }

                    return updatedProducto;
                }
                return producto;
            });
        });
    };

    const handleInputChangeNuevoProducto = (index, campo, valor) => {
        console.log(nuevosProductos)
        console.log(index)
        console.log(campo)
        console.log(valor)
        setNuevosProductos(prevProductos => {
            return prevProductos.map((producto, i) => {
                // Si el índice coincide con el índice actual del producto en el array
                if (i === index) {
                    // Actualiza solo el campo específico para ese producto
                    return {
                        ...producto,
                        [campo]: valor
                    };
                }
                // Si no es el producto actual, devuelve el producto sin cambios
                return producto;
            });
        });
    };


    const changeSubmit = () => {
        console.log(productosSeleccionados);
        fetch('/api/compras/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                productos: productosSeleccionados,
                datosCompra: datosCompra,
                nuevosProductos: nuevosProductos
            }),
        })
            .then(response => {
                if (response.status === 422) {
                    return response.json().then(err => {
                        throw err;
                    });
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {
                // Código para manejar la respuesta exitosa
                reset();
                setProductosSeleccionados([]);
                alert('Todo guardado correctamente');
            })
            .catch(error => {
                if (error.errors) {
                    // Aquí puedes manejar los errores de validación
                    console.error('Errores de validación:', error.errors);
                } else {
                    console.error('Error fetching data:', error.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const agregarProductoNuevo = () => {

        // Crea un nuevo producto con valores iniciales o vacíos
        const nuevoProducto = {
            id: Math.random(),
            titulo: '',
            codigo_barra: '',
            precio_costo: '',
            precio_venta: '',
            stock: '',
            usar_control_por_lote: false,
            fecha_vencimiento: '',
            inversor_id: '',
            highlighted: false,
        };

        // Agrega el nuevo producto a la lista de productos seleccionados
        setNuevosProductos([...nuevosProductos, nuevoProducto]);
        console.log(nuevosProductos)
    }

    return (
        <>
            {/* BUSCADOR */}
            <div style={styles.listContainer}>
                <div className='flex justify-between'>
                    <div>
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
                        (productosSeleccionados.length > 0 || nuevosProductos.length > 0)  &&
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
                                <Button className="bg-foreground text-background" onClick={() => { changeSubmit() }}>Cargar Compra</Button>
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
                    <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
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
                                            variant="faded"
                                            type="number"
                                            textValue={producto.precio_costo || ''}
                                            labelPlacement="outside"
                                            onValueChange={(e) => handleInputChangeProducto(producto.titulo, 'precio_costo', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="faded"
                                            type="number"
                                            textValue={producto.precio_venta || ''}
                                            labelPlacement="outside"
                                            onValueChange={(e) => handleInputChangeProducto(producto.titulo, 'precio_venta', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="faded"
                                            type="number"
                                            textValue={producto.stock || ''}
                                            labelPlacement="outside"
                                            onValueChange={(e) => handleInputChangeProducto(producto.titulo, 'stock', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            value={producto.usar_control_por_lote}
                                            onValueChange={(e) => handleInputChangeProducto(producto.titulo, 'usar_control_por_lote', e.target.checked)}
                                        ></Checkbox>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="faded"
                                            type="date"
                                            textValue={producto.fecha_vencimiento || ''}
                                            labelPlacement="outside"
                                            onValueChange={(e) => handleInputChangeProducto(producto.titulo, 'fecha_vencimiento', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select 
                                            label="Seleccione" 
                                            className="max-w-xs" 
                                            variant="faded"
                                            style={{ minWidth: '150px' }}
                                            onValueChange={(e) => handleInputChangeProducto(producto.titulo, 'inversor_id', e.target.value)}
                                        >
                                            {inversores.map((inversor) => (
                                            <SelectItem key={inversor.id} value={inversor.id}>
                                                {inversor.nombre}
                                            </SelectItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {
                                nuevosProductos.map((producto) =>
                                (
                                    <TableRow key={Math.random()}>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="text"
                                                name={`titulo_${producto.id}`}
                                                textValue={producto.titulo}
                                                labelPlacement="outside"
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'titulo', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="number"
                                                textValue={producto.codigo_barra}
                                                name={`codigo_barra_${producto.id}`}
                                                labelPlacement="outside"
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'codigo_barra', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="number"
                                                labelPlacement="outside"
                                                textValue={producto.precio_costo}
                                                name={`precio_costo_${producto.id}`}
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'precio_costo', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="number"
                                                labelPlacement="outside"
                                                textValue={producto.precio_venta}
                                                name={`precio_venta_${producto.id}`}
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'precio_venta', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="text"
                                                name={`stock_${producto.id}`}
                                                textValue={producto.stock}
                                                labelPlacement="outside"
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'stock', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                value={producto.usar_control_por_lote}
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'usar_control_por_lote', e.target.checked)}
                                            ></Checkbox>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="faded"
                                                type="date"
                                                name={`fecha_vencimiento_${producto.id}`}
                                                textValue={producto.fecha_vencimiento}
                                                labelPlacement="outside"
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'fecha_vencimiento', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select 
                                                label="Seleccione" 
                                                className="max-w-xs" 
                                                variant="faded"
                                                textValue={producto.inversor_id}
                                                style={{ minWidth: '150px' }}
                                                onValueChange={(e) => handleInputChangeNuevoProducto(producto.id, 'inversor_id', e.target.value)}
                                            >
                                                {inversores.map((inversor) => (
                                                <SelectItem key={inversor.id} value={inversor.id}>
                                                    {inversor.nombre}
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

            <div className='mt-4 text-center'>
                <button onClick={agregarProductoNuevo}>Agregar Nuevo Producto</button>
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

export default TablaListCompras
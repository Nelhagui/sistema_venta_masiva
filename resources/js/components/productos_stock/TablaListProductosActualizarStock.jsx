import React, { useState, useEffect, useRef } from 'react'
import { capitalizeFirstLetterOfEachWord } from '../../utils/capitalizeFirstLetterOfEachWord';
import { debounce } from '../../utils/debounce';
import { Input } from "@nextui-org/react";
import { SearchIcon } from '../icons/SearchIcon';

// Estilo de resaltado
const highlightedStyle = {
    backgroundColor: 'green',
    transition: 'background-color 2s ease', // Animación de transición
};

const TablaListaProductosActualizarStock = ({ productos }) => {
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const [proveedores, setProveedores] = useState([])
    const [inversores, setInversores] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingProveedores, setIsLoadingProveedores] = useState(true)
    const [isLoadingInversores, setIsLoadingInversores] = useState(true)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([])

    useEffect(() => {
        if (inputRef.current) {
            focusInput();
        }
        // Realizar la solicitud GET a la API de productos
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
            .finally(() => {
                setIsLoadingInversores(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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

    const realizarBusqueda = (textoBusqueda) => {
        const MAX_PRODUCTOS = 30;
        if (textoBusqueda === '') {
            setObjetosBuscados([]);
        } else {
            if (/^\d+$/.test(textoBusqueda)) {
                const productoEncontrado = productosIniciales.find((producto) => Number(producto.codigo_barra) === Number(textoBusqueda));
                if (productoEncontrado) {
                    addProducto(productoEncontrado)
                } else {
                    setObjetosBuscados([]);
                    handleInputFocus();
                }
            } else {
                const productosCoincidentes = productosIniciales
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
                            p.codigo_barra === producto.codigo_barra
                                ? { ...p, highlighted: false }
                                : p
                        )
                    );
                }, 1000);
                return prevProductos.map(p => {
                    if (p.codigo_barra === productoExistente.codigo_barra) {
                        return {
                            ...p,
                            stock: p.stock + 1,
                            cantidad: p.cantidad + 1,
                            highlighted: true
                        };
                    }
                    return p;
                });
            } else {
                setTimeout(() => {
                    setProductosSeleccionados((prevProductos) =>
                        prevProductos.map((p) =>
                            p.codigo_barra === producto.codigo_barra
                                ? { ...p, highlighted: false }
                                : p
                        )
                    );
                }, 1000);
                producto = { ...producto, highlighted: true, cantidad: 1 }
                return [producto, ...prevProductos];
            }
        });
        reset();
    };

    const handleInputChangeProducto = (codigo_barra, campo, valor) => {
        setProductosSeleccionados(prevProductos => {
            return prevProductos.map(producto => {
                if (producto.codigo_barra === codigo_barra) {
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

                    return updatedProducto;
                }
                return producto;
            });
        });
    };

    const changeSubmit = () => {
        // Realizar la solicitud GET a la API de productos
        fetch('/api/productos/actualizar/stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ productos: productosSeleccionados }),
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

    const sacarProducto = (productoId) => {
        const filtrados = productosSeleccionados.filter((item) => item.id !== productoId)
        setProductosSeleccionados(filtrados);
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
                        <span style={{ marginLeft: 18, color: 'green' }}>{productosSeleccionados?.length > 0 ? `Productos: ${productosSeleccionados?.length}` : ''}</span>
                    </div>
                    <div>
                        <button onClick={() => { changeSubmit() }}>GUARDAR</button>
                    </div>

                </div>

                <ul style={inputText ? styles.productosListWithBorder : styles.productosList}>
                    {
                        objetosBuscados.length > 0
                            ? (
                                objetosBuscados.map((producto) => (
                                    <li key={producto.id} style={styles.containerRowProducto} className='border-t border-b' onClick={() => { addProducto(producto) }}>
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

            <div style={styles.productosStockContainer}>
                {
                    productosSeleccionados.map((producto) =>
                    (
                        <div key={producto.codigo_barra || producto.id}>
                            {
                                producto.usar_control_por_lote == 1 ?
                                    <div style={styles.productosStock} className={producto.highlighted ? 'highlighted-row' : 'highlighted-none'}>
                                        <div className='flex justify-between'>
                                            <div className='flex'>
                                                <p className='text-center'>{capitalizeFirstLetterOfEachWord(producto.titulo)}</p>
                                                <p className='text-center'>(control por lote)</p>
                                            </div>
                                            <div>
                                                <span style={{ cursor: 'pointer' }} onClick={() => sacarProducto(producto.id)}>x</span>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4 mt-2'>
                                            <div>
                                                <input
                                                    className='text-sm'
                                                    type="number"
                                                    value={producto.precio_costo || ''}
                                                    style={styles.inputStock}
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'precio_costo', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className='text-sm'
                                                    type="number"
                                                    value={producto.precio_venta || ''}
                                                    style={styles.inputStock}
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'precio_venta', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className='text-sm'
                                                    type="date"
                                                    value={producto.fecha_vencimiento || ''}
                                                    style={styles.inputStock}
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'fecha_vencimiento', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <select
                                                    className='text-sm'
                                                    value={producto.proveedor_id || ''}
                                                    style={styles.selectStock}
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'proveedor_id', e.target.value)}
                                                >
                                                    <option value="">Seleccione un proveedor</option>
                                                    {
                                                        proveedores.map((proveedor) => {
                                                            return <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <input
                                                    className='text-sm'
                                                    type="text"
                                                    value={producto.numero_factura || ''}
                                                    placeholder='n° Factura'
                                                    style={styles.inputStock}
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'numero_factura', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <select
                                                    className='text-sm'
                                                    value={producto.inversor_id || ''}
                                                    style={styles.selectStock}
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'inversor_id', e.target.value)}
                                                >
                                                    <option value="">Seleccione un inversor</option>
                                                    {
                                                        inversores.map((inversor) => {
                                                            return <option key={inversor.id} value={inversor.id}>{inversor.nombre} {inversor.apellido}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <input
                                                    className='text-sm'
                                                    style={styles.inputStock}
                                                    type="text"
                                                    defaultValue={producto.cantidad}
                                                    placeholder='stock'
                                                    onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'nuevo_stock', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div style={styles.productos} className={producto.highlighted ? 'highlighted-row justify-between' : 'highlighted-none justify-between'}>
                                        <div>
                                            <p>{capitalizeFirstLetterOfEachWord(producto.titulo)}</p>
                                        </div>
                                        <div>
                                            <select
                                                className='text-sm'
                                                value={producto.inversor_id || ''}
                                                style={styles.selectStock}
                                                onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'inversor_id', e.target.value)}
                                            >
                                                <option value="">Seleccione un inversor</option>
                                                {
                                                    inversores.map((inversor) => {
                                                        return <option key={inversor.id} value={inversor.id}>{inversor.nombre} {inversor.apellido}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <p>Actual: {producto.stock_actual}</p>
                                            <input
                                                className='text-sm'
                                                style={styles.inputStock}
                                                type="text"
                                                defaultValue={producto.cantidad}
                                                placeholder='Nuevo stock'
                                                onChange={(e) => handleInputChangeProducto(producto.codigo_barra, 'nuevo_stock', e.target.value)}
                                            />
                                            <span style={{ cursor: 'pointer' }} onClick={() => sacarProducto(producto.id)}>x</span>
                                        </div>
                                    </div>
                            }
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
}

const styles = {
    inputStock: {
        maxWidth: '7.8em',
        padding: '2px',
    },
    selectStock: {
        padding: '2px',
    },
    productosStockContainer: {
        display: 'grid',
        rowGap: '1.5rem',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
    },
    productosStock: {
        padding: '1.3rem 1.5rem',
        cursor: 'pointer',
        borderRadius: '.5rem',
        borderWidth: '1px',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        backgroundColor: '#fff'
    },
    productos: {
        display: 'flex', 
        padding: '1.3rem 1.5rem',
        cursor: 'pointer',
        borderRadius: '.5rem',
        borderWidth: '1px',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        backgroundColor: '#fff'
    },
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
        backgroundColor: "#fff"
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

export default TablaListaProductosActualizarStock
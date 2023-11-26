import React, { useState, useEffect, useRef } from 'react';
import ResumenPedido from './ResumenPedido';
import { debounce } from '../../utils/debounce';
import Example from './Example';

function ListProductos({ productos, metodosDePago }) {
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const [metodosSeleccionados, setMetodosSeleccionados] = useState([]);
    const [segundoMetodoPago, setSegundoMetodoPago] = useState(false);
    const [metodosDisponibles, setMetodosDisponibles] = useState(metodosDePago);

    const totalVenta = productosSeleccionados.reduce((sum, producto) => sum + (producto.precio_venta * producto.cantidad), 0)
    const [montos, setMontos] = useState({
        monto_abonado: totalVenta,
        monto_abonado_dos: 0,
    });

    const handleChangeMetodoPago = (e) => {
        const metodoId = parseInt(e.target.value);
        const nombreMetodo = e.target.options[e.target.selectedIndex].text;

        const nuevoMetodo = {
            nombre: nombreMetodo,
            metodo_pago_id: metodoId,
            monto_abonado: montos.monto_abonado,
        };
        setMetodosSeleccionados([...metodosSeleccionados, nuevoMetodo]);

        const nuevosMetodosDisponibles = metodosDePago.filter(
            (metodo) => metodo.id !== metodoId
        );
        setMetodosDisponibles(nuevosMetodosDisponibles);

        // Mostrar el segundo método de pago y su monto si se eligen múltiples métodos
        if (metodosSeleccionados.length === 0) {
            setSegundoMetodoPago(true);
        }
    };

    const handleChangeMonto = (e) => {
        const inputName = e.target.name;
        const value = parseFloat(e.target.value);
        setMontos({ ...montos, [inputName]: value });
    };

    const handleElegirOtroMetodo = () => {
        // Mostrar el segundo método de pago
        setSegundoMetodoPago(true);
    };


    useEffect(() => {
        setProductosIniciales(productos);
        focusInput()
    }, [productos]);

    const handleModalConfirmation = () => {
        setShowModal(true);
    };

    // const handleChangeMetodoPago = (e) => {
    //     let value = e.target.value
    //     setMetodoPagoSeleccionado(value)
    // }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmVenta = () => {
        handleSubmit();
        setShowModal(false);
    };


    const handleSubmit = () => {
        console.log({ productos: productosSeleccionados })
        console.log(metodosSeleccionados)
        fetch('http://127.0.0.1:8000/api/ventas/crear', {
            method: 'POST', // Usar el método POST
            headers: {
                'Content-Type': 'application/json', // Asegurarse de enviar los datos en formato JSON
            },
            // Aquí debes incluir los datos que deseas enviar al servidor
            body: JSON.stringify({ productos: productosSeleccionados, metodos_de_pago: metodosSeleccionados }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    // BUSCADOR
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
                    console.log(productoEncontrado)
                    addProducto(productoEncontrado)
                    focusInput()
                } else {
                    setObjetosBuscados([]);
                    handleInputFocus();
                }
            } else {
                const productosCoincidentes = productosIniciales.filter((producto) => producto.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()))
                    .slice(0, MAX_PRODUCTOS);
                setObjetosBuscados(productosCoincidentes);
            }
        }
        setIsLoading(false)
    }

    const debouncedSearchRef = useRef(debounce((textoBusqueda) => realizarBusqueda(textoBusqueda), 200));

    const addProducto = (producto) => {
        console.log('productos seleccionados', productosSeleccionados);
        setProductosSeleccionados(prevProductos => {
            const productoExistente = prevProductos.find(p => (producto.titulo === p.titulo));
            console.log('producto Existente', productoExistente);
            if (productoExistente) {
                console.log('aca1')
                // Si el producto ya existe, incrementamos su stock en 1 y le agregamos el efecto highlighted
                setProductosSeleccionados((prevProductos) =>
                    prevProductos.map((p) =>
                        p.titulo === producto.titulo
                            ? { ...p, highlighted: false }
                            : p
                    )
                );

                return prevProductos.map(p => {
                    if (p.titulo === productoExistente.titulo) {
                        return {
                            ...p,
                            cantidad: p.cantidad + 1,
                            highlighted: true
                        };
                    }
                    return p;
                });
            } else {
                producto = { ...producto, highlighted: false, cantidad: 1 }
                return [producto, ...prevProductos];
            }
        });
        reset();

    };

    // FIN BUSCADOR

    return (
        <>
            <div className='flex justify-between'>
                {/* BUSCADOR */}
                <div style={styles.listContainer}>
                    <div className='flex justify-between'>
                        <div>
                            <input
                                type="text"
                                value={inputText}
                                ref={inputRef}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                placeholder="Ingrese el código de barras o título"
                                style={{ minWidth: '450px' }}
                            />
                            <span style={{ marginLeft: 18, color: 'green' }}>{productosSeleccionados?.length > 0 ? `Productos: ${productosSeleccionados?.length}` : ''}</span>
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
                                )
                        }
                    </ul>
                </div>
                {/* FIN BUSCADOR */}
                <div style={{ marginTop: '-20px', visibility: productosSeleccionados.length <= 0 ? 'hidden' : 'visible' }}>
                    <h2>Seleccionar Método de Pago:</h2>
                    <select name="metodo_pago_id" onChange={handleChangeMetodoPago}>
                        {metodosDePago.map((metodo) => (
                            <option key={metodo.id} value={metodo.id}>
                                {metodo.nombre}
                            </option>
                        ))}
                    </select>
                    {segundoMetodoPago && (
                        <>
                            <input
                                name='monto_abonado'
                                type='number'
                                value={montos.monto_abonado}
                                onChange={handleChangeMonto}
                            />
                            <h2>Seleccionar Método de Pago dos:</h2>
                            <select name="metodo_pago_id_dos" onChange={handleChangeMetodoPago}>
                                <option value="">Seleccionar segundo método de pago</option>
                                {metodosDisponibles.map((metodo) => (
                                    <option key={metodo.id} value={metodo.id}>
                                        {metodo.nombre}
                                    </option>
                                ))}
                            </select>
                            <input
                                name='monto_abonado_dos'
                                type='number'
                                value={montos.monto_abonado_dos}
                                onChange={handleChangeMonto}
                            />
                        </>
                    )}
                    <button onClick={handleElegirOtroMetodo}>Elegir otro metodo</button>
                </div>
                <div>
                    <button
                        type="button"
                        style={{
                            borderWidth: 1,
                            padding: 9,
                            backgroundColor: "#4c4c4c",
                            color: "#ffff",
                            borderRadius: 5,
                            visibility: productosSeleccionados.length <= 0 ? 'hidden' : 'visible'
                        }}
                        onClick={handleModalConfirmation}
                    >
                        Cargar Venta (F12)
                    </button>
                </div>
            </div>
            {showModal && (
                <div style={styles.modalVenta}>
                    <div style={styles.modalContent}>
                        <h2 className="font-semibold text-xl leading-tight pb-3">¿Estás seguro que deseas cargar la venta?</h2>
                        <div className='mt-3 flex justify-end'>
                            <button onClick={handleConfirmVenta} className="hover:bg-gray-500 bg-gray-600 text-gray-200 px-3 py-1  cursor-pointer rounded">Confirmar</button>
                            <button onClick={handleCloseModal} className="hover:bg-gray-500 bg-gray-300 text-white px-3 py-1 cursor-pointer rounded">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {
                productosSeleccionados.length > 0
                    ?
                    <ResumenPedido
                        productosSeleccionados={productosSeleccionados}
                        setProductosSeleccionados={setProductosSeleccionados}
                    />
                    :
                    ""
            }
        </>
    );
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
        backgroundColor: "#fff"
    },
    productoTitulo: {
        fontSize: '10pt',
    },
    productoPrecioVenta: {
        fontSize: "9pt",
    },
    modalVenta: {
        position: 'fixed',
        background: '#0000003b',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: '999999',
        display: 'block',
        transitionDuration: '.2s',
    },
    modalContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '2rem 3rem',
        borderRadius: '11px',
    },
};
styles.productosListWithBorder = {
    ...styles.productosList,
    border: '1px solid #ccc',
};

export default ListProductos;

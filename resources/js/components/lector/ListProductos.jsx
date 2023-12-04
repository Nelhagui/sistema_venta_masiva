import React, { useState, useEffect, useRef } from 'react';
import ResumenPedido from './ResumenPedido';
import { debounce } from '../../utils/debounce';
import InputMetodoPago from './InputMetodoPago';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListProductos({ productos, metodosDePago }) {
    const [metodosAgregados, setMetodosAgregados] = useState([]);
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const [mostrarModalConfirmacionVenta, setMostrarModalConfirmacionVenta] = useState(false);

    const [metodosSeleccionados, setMetodosSeleccionados] = useState([]);
    const nameFirstSelectorMetodoPago = "metodo_primero";
    const [valueMontoFirstSelector, setValueMontoFirstSelector] = useState('')
    const [firstMetodoValue, setFirstMetodoValue] = useState('')
    const [firstMetodoNombre, setFirstMetodoNombre] = useState('')


    useEffect(() => {
        setProductosIniciales(productos);
        focusInput()
    }, [productos]);


    useEffect(() => {
        if (metodosDePago && metodosDePago.length > 0) {
            // Encontrar el método de pago con el nombre "Efectivo"
            const metodoEfectivo = metodosDePago.find(metodo => metodo.nombre === "Efectivo");
            if (metodoEfectivo) {
                // Establecer el método de pago "Efectivo" como el primer método seleccionado
                setMetodosSeleccionados([{
                    nombre: metodoEfectivo.nombre,
                    metodo_pago_id: metodoEfectivo.id, // Asumiendo que el método tiene una propiedad 'id'
                    monto_abonado: 0, // Establece este valor según sea necesario
                    selectorName: nameFirstSelectorMetodoPago,
                }]);
            }
        }
        setFirstMetodoNombre('Efectivo')
    }, [metodosDePago])


    const handleChangeMetodoPago = (e) => {
        const { value, name } = e.target;
        const nombreMetodo = e.target.options[e.target.selectedIndex].text;

        setMetodosSeleccionados(prevMetodos => {
            // Buscar el índice del método de pago que coincida con el name del selector
            const indiceExistente = prevMetodos.findIndex(metodo => metodo.selectorName === name);

            if (indiceExistente >= 0) {
                // Crear un nuevo objeto de método con el monto existente
                const nuevoMetodo = {
                    ...prevMetodos[indiceExistente], // Copia el objeto existente
                    nombre: nombreMetodo,
                    metodo_pago_id: value,
                    selectorName: name,
                };
                // Actualizar el método existente con el nuevo valor
                return prevMetodos.map((metodo, indice) =>
                    indice === indiceExistente ? nuevoMetodo : metodo
                );
            } else {
                // Si no existe un método para este selector, agregar como nuevo elemento
                const nuevoMetodo = {
                    nombre: nombreMetodo,
                    metodo_pago_id: value,
                    monto_abonado: '', // Puede inicializarse con un valor predeterminado
                    selectorName: name,
                };
                return [...prevMetodos, nuevoMetodo];
            }
        });
        if (name === nameFirstSelectorMetodoPago) {
            setFirstMetodoValue(e.target.value)
            setFirstMetodoNombre(e.target.options[e.target.selectedIndex].text)
        }
    };

    const handleChangeMonto = (e) => {
        const { value, name } = e.target;
        setValueMontoFirstSelector(value);
        const nuevoMetodo = {
            nombre: firstMetodoNombre,
            metodo_pago_id: firstMetodoValue,
            monto_abonado: value,
            selectorName: name,
        };
        setMetodosSeleccionados(prevMetodos => {
            const indiceExistente = prevMetodos?.findIndex(metodo => metodo?.selectorName === name);
            if (indiceExistente >= 0) {
                return prevMetodos.map((metodo, indice) =>
                    indice === indiceExistente ? nuevoMetodo : metodo
                );
            }
        });
    };

    const handleModalConfirmation = () => {
        setMostrarModalConfirmacionVenta(true);
    };

    const handleCloseModal = () => {
        setMostrarModalConfirmacionVenta(false);
    };

    const handleConfirmVenta = () => {
        handleSubmit();
        setMostrarModalConfirmacionVenta(false);
        setProductosSeleccionados([])
        setMetodosSeleccionados([])
        toast.success('Venta realizada con éxito', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    };

    const handleSubmit = () => {
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
        setProductosSeleccionados(prevProductos => {
            const productoExistente = prevProductos.find(p => (producto.titulo === p.titulo));
            if (productoExistente) {
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

    const agregarComponente = () => {
        setMetodosAgregados(prev => [...prev, <InputMetodoPago key={prev.length} metodos={metodosDePago} name={Math.random()} metodosSeleccionados={metodosSeleccionados} handleChangeMetodoPago={handleChangeMetodoPago} setMetodosSeleccionados={setMetodosSeleccionados} />]);
    };

    useEffect(() => {
        console.log(metodosSeleccionados)
    }, [metodosSeleccionados])


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
                <div style={{ visibility: productosSeleccionados.length <= 0 ? 'hidden' : 'visible', maxWidth: '400px' }}>

                    <div className='flex my-2'>
                        <select name={nameFirstSelectorMetodoPago} onChange={handleChangeMetodoPago} className='text-sm'>
                            {metodosDePago.map((metodo) => (
                                <option key={metodo.id} value={metodo.id}>
                                    {metodo.nombre}
                                </option>
                            ))}
                        </select>
                        <input
                            name={nameFirstSelectorMetodoPago}
                            type='number'
                            value={valueMontoFirstSelector}
                            onChange={handleChangeMonto}
                            style={{maxWidth: "100px"}}
                        />
                    </div>
                    <div className='flex flex-col mb-6' style={{ maxWidth: '400px' }}>
                        {metodosAgregados}
                        <div>
                            {
                                metodosAgregados.length < (metodosDePago.length - 1)
                                    ? <button onClick={agregarComponente} className='mt-2'>Agregar otro metodo</button>
                                    : ""
                            }
                        </div>
                    </div>
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
            {mostrarModalConfirmacionVenta && (
                <div style={styles.modalVenta}>
                    <div style={styles.modalContent}>
                        <h2 className="font-semibold text-xl leading-tight pb-3">¿Estás seguro que deseas cargar la venta?</h2>
                        <div className='mt-3 flex justify-end'>
                            <button 
                                onClick={handleConfirmVenta} 
                                className="hover:bg-gray-500 bg-gray-600 text-gray-200 px-3 py-1  cursor-pointer rounded" 
                                id="confirmarVentaToast">
                                    Confirmar
                            </button>
                            <button 
                                onClick={handleCloseModal} 
                                className="hover:bg-gray-500 bg-gray-300 text-white px-3 py-1 cursor-pointer rounded">
                                    Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
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

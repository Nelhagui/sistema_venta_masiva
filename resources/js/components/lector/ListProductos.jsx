import React, { useState, useEffect, useRef } from 'react';
import ResumenPedido from './ResumenPedido';
import { debounce } from '../../utils/debounce';
import Example from './Example';

function ListProductos({ productos }) {
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        setProductosIniciales(productos);
    }, [productos]);

    const handleSubmit = () => {
        console.log({productos: productosSeleccionados})
        fetch('http://127.0.0.1:8000/api/ventas/crear', {
            method: 'POST', // Usar el método POST
            headers: {
                'Content-Type': 'application/json', // Asegurarse de enviar los datos en formato JSON
            },
            // Aquí debes incluir los datos que deseas enviar al servidor
            body: JSON.stringify({productos: productosSeleccionados}),
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
                    addProducto(productoEncontrado)
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
                console.log('aca2')
                setProductosSeleccionados((prevProductos) =>
                    prevProductos.map((p) =>
                        p?.titulo === producto?.titulo
                            ? { ...p, highlighted: false, cantidad: 1 }
                            : { ...p }
                    )
                );

                return [producto, ...prevProductos];
            }
        });
        reset();

    };

    // FIN BUSCADOR

    return (
        <>
        {/* <Example/> */}
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
                                )}
                    </ul>
                </div>
                {/* FIN BUSCADOR */}
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
                        onClick={handleSubmit}
                    >
                        Cargar Venta (F12)
                    </button>
                </div>
            </div>

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
    }
};
styles.productosListWithBorder = {
    ...styles.productosList,
    border: '1px solid #ccc',
};

export default ListProductos;

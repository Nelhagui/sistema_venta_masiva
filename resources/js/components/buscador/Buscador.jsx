import React, { useState, useRef, useCallback } from 'react';
import { debounce } from '../../utils/debounce';

const Buscador = ({ arrayDeObjetos, clickAction, focusInInput = false }) => {
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const inputTextRef = useRef();


    // const seleccionarProducto = (prodSelect) => {
    //     clickAction(prodSelect);
    //     resetBusqueda();
    // }

    const seleccionarProducto = async (prodSelect) => {
        await clickAction(prodSelect);
        resetBusqueda();
    }
    

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputText(value);
        inputTextRef.current = value;
        debouncedSearch();
    }

    const realizarBusqueda = () => {
        const MAX_PRODUCTOS = 30;
        if (inputTextRef.current === '') {
            setObjetosBuscados([]);
        } else {
            if (/^\d+$/.test(inputTextRef.current)) {
                const productoEncontrado = arrayDeObjetos.find((producto) => producto.codigo_barra === inputTextRef.current);
                if (productoEncontrado) {
                    seleccionarProducto(productoEncontrado);
                }
            } else {
                const productosCoincidentes = arrayDeObjetos
                    .filter((producto) => producto.titulo.toLowerCase().includes(inputTextRef.current.toLowerCase()))
                    .slice(0, MAX_PRODUCTOS);
                setObjetosBuscados(productosCoincidentes);
            }
        }
    }

    const debouncedSearch = useCallback(
        debounce(() => realizarBusqueda(), 500),
        []  // Dependencias vacías para garantizar que la función sólo se crea una vez
      );
      

    const activarFocus = () => {
        inputRef.current.focus();
    }

    const resetBusqueda = () => {
        setInputText('');
        setObjetosBuscados([]);
        activarFocus();
    }

    return (
        <>
            <div style={styles.listContainer}>
                <input
                    type="text"
                    ref={inputRef}
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Ingrese el código de barras o título"
                    style={{ minWidth: '450px' }}
                />

                <ul style={inputText ? styles.productosListWithBorder : styles.productosList}>
                    {objetosBuscados.length > 0 ? (
                        objetosBuscados.map((producto) => (
                            <li key={producto.codigo_barra} style={styles.containerRowProducto} className='border-t border-b' onClick={() => { seleccionarProducto(producto) }}>
                                <p style={styles.productoTitulo}>{producto.titulo}</p>
                                <p style={styles.productoPrecioVenta}>{producto.precio_venta ? `$${producto.precio_venta}` : ''}</p>
                            </li>
                        ))
                    ) : (
                        inputText && <li style={{ textAlign: 'center', padding: 8, backgroundColor: '#e2e2e2' }}>Sin Resultados</li>
                    )}
                </ul>
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

export default Buscador;

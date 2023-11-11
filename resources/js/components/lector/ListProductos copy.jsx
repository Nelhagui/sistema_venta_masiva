import React, { useState, useEffect, useRef } from 'react';
import ResumenPedido from './ResumenPedido';
import Buscador from '../buscador/Buscador';

function ListProductos({ productos }) {
    const [productosSeleccionados, setProductosSeleccionados] = useState([])


    const handleSubmit = () => {
        console.log('enviando..')
        // /ventas/crear
    }

    const selectProduct = (productClick) => {
        const productoEncontrado = productosSeleccionados.some((item) => item.id == productClick.id);
        if (productoEncontrado) {
            const productosActualizados = productosSeleccionados.map(producto => {
                if (producto.id === productClick.id) {
                    return { ...producto, cantidad: Number(producto.cantidad + 1) };
                }
                return producto;
            });
            setProductosSeleccionados(productosActualizados);
        } else {
            productClick.cantidad = 1;
            setProductosSeleccionados([...productosSeleccionados, productClick]);
        }
    }



    return (
        <>
            <div className='flex justify-between'>
                <Buscador arrayDeObjetos={productos} clickAction={selectProduct} productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} />
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

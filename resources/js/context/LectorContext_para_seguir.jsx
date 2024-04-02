import React, { createContext, useContext, useState, useEffect } from 'react';

const LectorContext = createContext();

const LectorContextProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [listaProductosSeleccionados, setListaProductosSeleccionados] = useState([]);
    const [productos, setProductos] = useState([])
    const [filtroBusqueda, setFiltroBusqueda] = useState([])
    const [totalEnVenta, setTotalEnVenta] = useState(0)
    const [totalAumento, setTotalAumento] = useState(0)
    const [totalDescuento, setTotalDescuento] = useState(0)

    useEffect(() => {
        if (query === "") {
            setFiltroBusqueda([])
            setSelectedItemIndex(null)
        }
    }, [query])

    const insertarProductoEnLista = (producto = null) => {
        const nuevoProducto = producto !== null ? producto : filtroBusqueda[selectedItemIndex];
        // Verifica si el producto ya está presente en la lista
        const productoExistenteIndex = listaProductosSeleccionados.findIndex(producto => producto.id === nuevoProducto.id);

        if (productoExistenteIndex !== -1) {
            // Si el producto ya está presente, actualiza su cantidad
            const nuevaListaProductos = [...listaProductosSeleccionados];
            nuevaListaProductos[productoExistenteIndex].cantidad++;
            setListaProductosSeleccionados(nuevaListaProductos);
        } else {
            // Si el producto no está presente, agrégalo al estado con cantidad = 1
            setListaProductosSeleccionados([{ ...nuevoProducto, cantidad: 1 }, ...listaProductosSeleccionados]);
        }
        setQuery('');
    }

    useEffect(() => {
        calcularTotal()
    }, [listaProductosSeleccionados])

    const calcularTotal = () => {
        const total = listaProductosSeleccionados.reduce((acc, producto) => {
            // Multiplica el precio de venta por la cantidad y suma al acumulador
            const cantidad = isNaN(producto.cantidad) || producto.cantidad === "" ? 1 : producto.cantidad;
            return acc + (producto.precio * cantidad);
        }, 0);
        setTotalEnVenta(total.toFixed(2))
    }

    return (
        <LectorContext.Provider
            value={{
                query, setQuery,
                selectedItemIndex, setSelectedItemIndex,
                productos, setProductos,
                filtroBusqueda, setFiltroBusqueda,
                listaProductosSeleccionados, setListaProductosSeleccionados,
                productoSeleccionado, setProductoSeleccionado,
                insertarProductoEnLista,
                totalEnVenta,
                totalAumento, setTotalAumento,
                totalDescuento, setTotalDescuento
            }}
        >
            {children}
        </LectorContext.Provider>
    );
};

const useLectorContext = () => {
    return useContext(LectorContext);
};

export { LectorContextProvider, useLectorContext };
import React, { createContext, useContext, useState, useEffect } from 'react';

const LectorContext = createContext();

const LectorContextProvider = ({ children }) => {
    const [vuelto, setVuelto] = useState(0)
    const [total, setTotal] = useState(0);
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [aumento, setAumento] = useState('')
    const [descuento, setDescuento] = useState('')
    const [tipoVariableDescuento, setTipoVariableDescuento] = useState("$")
    const [tipoVariableAumento, setTipoVariableAumento] = useState('$')

    const sacarProducto = (productoId) => {
        const filtrados = productosSeleccionados.filter((item) => item.id !== productoId)
        setProductosSeleccionados(filtrados);
        if (filtrados.length === 0)
            cancelarCompra();
    }

    const obtenerTotal = () => {
        let subTotal = productosSeleccionados.reduce((sum, producto) => sum + (producto.precio_venta * producto.cantidad), 0);
        let totalFinal = Number(subTotal) + Number(aumento) - Number(descuento);
        setTotal(totalFinal);
    }

    const obtenerTotalSinModificaciones = () => {
        let total = productosSeleccionados.reduce((sum, producto) => sum + (producto.precio_venta * producto.cantidad), 0);
        return total;
    }

    const cancelarCompra = () => {
        setVuelto(0);
        setTotal(0);
        setProductosSeleccionados([]);
        setAumento('');
        setDescuento('');
    }
    useEffect(() => {
        let total = productosSeleccionados.reduce((sum, producto) => sum + (producto.precio_venta * producto.cantidad), 0);
        if (descuento > 0) {
            setTotal(Number(total) - Number(descuento));
        }
        else if (aumento > 0) {
            calcularValorAumento();
        }
        else {
            setTotal(Number(total));
        }

    }, [descuento, aumento])

    useEffect(() => {
        obtenerTotal();
    }, [productosSeleccionados])

    useEffect(() => {
        calcularValorAumento();
    }, [tipoVariableAumento])

    const calcularValorAumento = () => {
        if (tipoVariableAumento === "%") {
            calcularPorcentajeAumento();
        } else {
            calcularTotalAumento();
        }
    }

    const calcularPorcentajeAumento = () => {
        const totalActual = obtenerTotalSinModificaciones();
        setTotal((Number(totalActual) * Number(aumento) / 100) + Number(totalActual))
    }
    const calcularTotalAumento = () => {
        const totalActual = obtenerTotalSinModificaciones();
        setTotal(Number(totalActual) + Number(aumento))
    }

    return (
        <LectorContext.Provider
            value={{
                obtenerTotal,
                vuelto,
                setVuelto,
                total,
                setTotal,
                productosSeleccionados,
                setProductosSeleccionados,
                sacarProducto,
                aumento,
                setAumento,
                descuento,
                setDescuento,
                obtenerTotalSinModificaciones,
                cancelarCompra,
                tipoVariableDescuento,
                setTipoVariableDescuento,
                tipoVariableAumento,
                setTipoVariableAumento
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


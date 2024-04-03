import React, { createContext, useContext, useState, useEffect } from 'react';

const LectorContext = createContext();

const LectorContextProvider = ({ children }) => {
    const tipoMontoFijo = 1;
    const tipoPorcentaje = 2;
    const [vuelto, setVuelto] = useState(0)
    const [total, setTotal] = useState(0);
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [montoAbonado, setMontoAbonado] = useState('')
    const [aumento, setAumento] = useState('')
    const [descuento, setDescuento] = useState('')
    const [tipoVariableDescuento, setTipoVariableDescuento] = useState(tipoMontoFijo)
    const [tipoVariableAumento, setTipoVariableAumento] = useState(tipoMontoFijo)
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = React.useState("0");
    const [idUltimaVenta, setIdUltimaVenta] = useState(null);

    const sacarProducto = (productoId) => {
        const filtrados = productosSeleccionados.filter((item) => item.id !== productoId)
        setProductosSeleccionados(filtrados);
        if (filtrados.length === 0)
            resetAll();
    }



    const obtenerTotalSinModificaciones = () => {
        let total = productosSeleccionados.reduce((sum, producto) => sum + obtenerTotalSegunTipoProducto(producto), 0).toFixed(2);
        return total;
    }
    const obtenerTotal = () => {

        let subTotal = productosSeleccionados.reduce((sum, producto) => sum + obtenerTotalSegunTipoProducto(producto), 0);

        let aumentoNumero = parseFloat(aumento);
        let descuentoNumero = parseFloat(descuento);

        if (isNaN(aumentoNumero)) aumentoNumero = 0;
        if (isNaN(descuentoNumero)) descuentoNumero = 0;

        let totalFinal = (Number(subTotal) + aumentoNumero - descuentoNumero).toFixed(2);

        setTotal(totalFinal);
    }

    const obtenerTotalSegunTipoProducto = (producto) => {
        if (producto.tipo === 'costo_adicional') {

            let precio_costo = parseFloat(producto.precio_costo);
            let precio_venta = parseFloat(producto.precio_venta);

            if (isNaN(precio_costo)) precio_costo = 0;
            if (isNaN(precio_venta)) precio_venta = 0;

            const costoVentaNumero = parseFloat(precio_costo + precio_venta);

            return costoVentaNumero;

        }
        return producto.precio_venta * producto.cantidad;
    }

    const resetAll = () => {
        setVuelto(0);
        setTotal(0);
        setProductosSeleccionados([]);
        setAumento('');
        setDescuento('');
        setMontoAbonado('');
    }
    useEffect(() => {
        let total = productosSeleccionados.reduce((sum, producto) => sum + obtenerTotalSegunTipoProducto(producto), 0);
        if (descuento > 0) {
            const totalToFixed = (Number(total) - Number(descuento)).toFixed(2)
            setTotal(totalToFixed);
        }
        else if (aumento > 0) {
            calcularValorAumento();
        }
        else {
            setTotal(Number(total).toFixed(2));
        }

    }, [descuento, aumento])

    useEffect(() => {
        obtenerTotal();
    }, [productosSeleccionados])

    useEffect(() => {
        calcularValorAumento();
    }, [tipoVariableAumento])

    const calcularValorAumento = () => {
        if (tipoVariableAumento === tipoPorcentaje) {
            calcularPorcentajeAumento();
        } else {
            calcularTotalAumento();
        }
    }

    const calcularPorcentajeAumento = () => {
        const totalActual = obtenerTotalSinModificaciones();
        const totalConAumento = (Number(totalActual) * Number(aumento) / 100) + Number(totalActual).toFixed(2)
        setTotal(totalConAumento)
    }
    const calcularTotalAumento = () => {
        const totalActual = obtenerTotalSinModificaciones();
        setTotal((Number(totalActual) + Number(aumento)).toFixed(2))
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
                resetAll,
                tipoVariableDescuento,
                setTipoVariableDescuento,
                tipoVariableAumento,
                setTipoVariableAumento,
                montoAbonado,
                setMontoAbonado,
                tipoMontoFijo,
                tipoPorcentaje,
                obtenerTotalSegunTipoProducto,
                metodoPagoSeleccionado, 
                setMetodoPagoSeleccionado,
                idUltimaVenta, setIdUltimaVenta
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


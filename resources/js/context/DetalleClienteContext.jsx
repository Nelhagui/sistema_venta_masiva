import React, { createContext, useContext, useState, useEffect } from 'react';

const DetalleClienteContext = createContext();

const DetalleClienteContextProvider = ({ children }) => {
    const [ventas, setVentas] = useState([])
    const [deudas, setDeudas] = useState([])
    const [idCliente, setIdCliente] = useState(null)
    const [metodosDePago, setMetodosDePago] = useState([["1"]])
    const [keyDeudasSelecionadas, setKeyDeudasSelecionadas] = React.useState([]);
    const [cliente, setCliente] = useState([])


    useEffect(() => {
        if (cliente?.deudas)
            setDeudas(cliente?.deudas)
        if(cliente?.todas_las_ventas)
            setVentas(cliente?.todas_las_ventas);
    }, [cliente])



    return (
        <DetalleClienteContext.Provider
            value={{
                ventas,
                setVentas,
                deudas,
                setDeudas,
                cliente,
                setCliente,
                keyDeudasSelecionadas, 
                setKeyDeudasSelecionadas,
                metodosDePago, 
                setMetodosDePago,
                idCliente, 
                setIdCliente
            }}
        >
            {children}
        </DetalleClienteContext.Provider>
    );
};

const useDetalleClienteContext = () => {
    return useContext(DetalleClienteContext);
};

export { DetalleClienteContextProvider, useDetalleClienteContext };


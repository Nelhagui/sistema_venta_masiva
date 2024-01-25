import React, { createContext, useContext, useState, useEffect } from 'react';

const DetalleClienteContext = createContext();

const DetalleClienteContextProvider = ({ children }) => {
    const [vuelto, setVuelto] = useState(0)
    

    return (
        <DetalleClienteContext.Provider
            value={{
                vuelto,
                setVuelto,
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


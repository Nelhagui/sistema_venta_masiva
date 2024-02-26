import React, { createContext, useContext, useState, useEffect } from 'react';

const DetalleInversorContext = createContext();

const DetalleInversorContextProvider = ({ children }) => {
    const [ventas, setVentas] = useState([])
    const [inversiones, setInversiones] = useState([])
    const [id, setId] = useState(null)
    const [metodosDePago, setMetodosDePago] = useState([["1"]])
    const [keyInversionesSelecionadas, setKeyInversionesSelecionadas] = React.useState([]);
    const [inversor, setInversor] = useState([])


    useEffect(() => {
        if (inversor?.inversiones)
            setInversiones(inversor?.inversiones)
        if(inversor?.ventas)
            setVentas(inversor?.ventas);
    }, [inversor])



    return (
        <DetalleInversorContext.Provider
            value={{
                ventas,
                setVentas,
                inversiones,
                setInversiones,
                inversor,
                setInversor,
                keyInversionesSelecionadas, 
                setKeyInversionesSelecionadas,
                metodosDePago, 
                setMetodosDePago,
                id, 
                setId
            }}
        >
            {children}
        </DetalleInversorContext.Provider>
    );
};

const useDetalleInversorContext = () => {
    return useContext(DetalleInversorContext);
};

export { DetalleInversorContextProvider, useDetalleInversorContext };


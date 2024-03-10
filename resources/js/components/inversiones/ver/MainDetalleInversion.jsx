import React from 'react'
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import inversionesServices from '../../../services/inversionesServices';
import { DetalleInversorContextProvider } from '../../../context/DetalleInversorContext';
import TablaListPagos from '../pagos/TablaListPagos';

export default function MainDetalleInversion() {
    const [inversion, setInversion] = useState({});
    const [pagados, setPagados] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idParam = params.get('id');
        if (idParam) {
            fetchDetalleInversion(idParam);
        }
    }, []);
    
    const fetchDetalleInversion = async (id) => {
        setIsLoading(true);
        try {
            const dataResponse = await inversionesServices.detalleInversion(id)
            setInversion(dataResponse);
            setPagados(dataResponse.pagos);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {
                isLoading
                    ? "Cargando..."
                    : <TablaListPagos pagos={pagados} inversion={inversion}  />
            }
        </>
    )
}

if (document.getElementById('mainDetalleInversion')) {
    const domNode = document.getElementById('mainDetalleInversion');
    const root = createRoot(domNode);
    root.render(
        <DetalleInversorContextProvider>
            <MainDetalleInversion />
        </DetalleInversorContextProvider>
    );
}
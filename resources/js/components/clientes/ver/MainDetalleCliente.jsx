import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleCliente from './DetalleCliente';
import clienteServices from '../../../services/clienteServices';
import { DetalleClienteContextProvider } from '../../../context/DetalleClienteContext';
import { useDetalleClienteContext } from '../../../context/DetalleClienteContext';
import metodoPagoServices from '../../../services/metodoPagoServices';

export default function MainDetalleCliente() {
    const {setCliente, setMetodosDePago, setIdCliente} = useDetalleClienteContext();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idParam = params.get('id');
        if (idParam) {
            setIdCliente(idParam);
            fetchData(idParam);
        }
    }, []);

    const fetchData = async (idParam) => {
        setIsLoading(true);
        try {
            await Promise.all([
                fetchDetalleCliente(idParam),
                fetchMetodosDePago()
            ]);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDetalleCliente = async (id) => {
        try {
            const dataResponse = await clienteServices.detalleCliente(id);
            setCliente(dataResponse);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        }
    };
    const fetchMetodosDePago = async () => {
        try {
            const response = await metodoPagoServices.traerLista();
            setMetodosDePago(response);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } 
    };

    return (
        <>
            {
                isLoading
                    ? "Cargando..."
                    : <DetalleCliente />
            }
        </>
    )
}

if (document.getElementById('mainDetalleCliente')) {
    const domNode = document.getElementById('mainDetalleCliente');
    const root = createRoot(domNode);
    root.render(
        <DetalleClienteContextProvider>
            <MainDetalleCliente />
        </DetalleClienteContextProvider>
    );
}
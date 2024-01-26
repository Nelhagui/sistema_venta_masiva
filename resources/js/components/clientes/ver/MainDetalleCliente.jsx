import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleCliente from './DetalleCliente';
import clienteServices from '../../../services/clienteServices';
import { DetalleClienteContextProvider } from '../../../context/DetalleClienteContext';
import { useDetalleClienteContext } from '../../../context/DetalleClienteContext';
import metodoPagoServices from '../../../services/metodoPagoServices';

export default function MainDetalleCliente({ clienteId }) {
    const {setCliente, setMetodosDePago, setIdCliente} = useDetalleClienteContext();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDetalleCliente()
        fetchMetodosDePago()
        setIdCliente(clienteId)
    }, [clienteId]);

    const fetchDetalleCliente = async () => {
        setIsLoading(true);
        try {
            const clientesResponse = await clienteServices.detalleCliente(clienteId);
            setCliente(clientesResponse);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };
    const fetchMetodosDePago = async () => {
        setIsLoading(true);
        try {
            const response = await metodoPagoServices.traerLista();
            setMetodosDePago(response);
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
                    : <DetalleCliente />
            }
        </>
    )
}

if (document.getElementById('mainDetalleCliente')) {
    const domNode = document.getElementById('mainDetalleCliente');
    const idCliente = domNode.dataset.clienteId;
    const root = createRoot(domNode);
    root.render(
        <DetalleClienteContextProvider>
            <MainDetalleCliente clienteId={idCliente} />
        </DetalleClienteContextProvider>
    );
}
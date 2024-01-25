import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleCliente from './DetalleCliente';
import clienteServices from '../../../services/clienteServices';
import { DetalleClienteContextProvider } from '../../../context/DetalleClienteContext';

export default function MainDetalleCliente({ clienteId }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDetalleCliente()
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

    return (
        <>
            {
                isLoading
                    ? "Cargando..."
                    : <DetalleCliente data={data} />
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
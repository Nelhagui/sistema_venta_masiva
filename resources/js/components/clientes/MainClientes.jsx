import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListClientes from './TablaListClientes';
import clienteServices from '../../services/clienteServices';

export default function MainClientes() {
    const [clientes, setClientes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchClientes()
    }, []);

    const fetchClientes = async () => {
        setIsLoading(true);
        try {
            const clientesResponse = await clienteServices.traerLista();
            setClientes(clientesResponse);
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
                    : <TablaListClientes clientes={clientes} />
            }
        </>
    )
}

if (document.getElementById('mainClientes')) {
    const domNode = document.getElementById('mainClientes');
    const root = createRoot(domNode);
    root.render(<MainClientes />);
}
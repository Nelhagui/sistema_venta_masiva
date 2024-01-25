import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleCliente from './DetalleCliente';
// import clienteServices from '../../services/clienteServices';

export default function MainDetalleCliente() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDetalleCliente()
    }, []);

    const fetchDetalleCliente = async () => {
        setIsLoading(true);
        try {
            // const clientesResponse = await clienteServices.traerLista();
            // setClientes(clientesResponse);
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
    const root = createRoot(domNode);
    root.render(<MainDetalleCliente />);
}
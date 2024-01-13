import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListClientes from './TablaListClientes';

export default function MainClientes() {
    const [clientes, setClientes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Realizar la solicitud GET a la API de clientes
        fetch('/api/clientes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de clientes
                setClientes(data);
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
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
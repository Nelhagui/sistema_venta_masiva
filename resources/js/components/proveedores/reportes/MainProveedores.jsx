import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListProveedores from './TablaListProveedores';

export default function MainProveedores() {
    const [proveedores, setProveedores] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Realizar la solicitud GET a la API de proveedores
        fetch('/api/proveedores')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de proveedores
                setProveedores(data);
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
                    : <TablaListProveedores proveedores={proveedores} />
            }
        </>
    )
}

if (document.getElementById('mainProveedores')) {
    const domNode = document.getElementById('mainProveedores');
    const root = createRoot(domNode);
    root.render(<MainProveedores />);
}
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListVentas from './TablaListVentas';

export default function MainVentas() {
    const [ventas, setVentas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Realizar la solicitud GET a la API de ventas
        fetch('/api/ventas')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de ventas
                setVentas(data);
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
                    : <TablaListVentas ventas={ventas} />
            }
        </>
    )
}

if (document.getElementById('mainVentas')) {
    const domNode = document.getElementById('mainVentas');
    const root = createRoot(domNode);
    root.render(<MainVentas />);
}
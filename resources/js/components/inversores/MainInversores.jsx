import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListInversores from './TablaListInversores';

export default function MainInversores() {
    const [inversores, setInversores] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Realizar la solicitud GET a la API de inversores
        fetch('/api/inversores')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de inversores
                setInversores(data);
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
                    : <TablaListInversores inversores={inversores} />
            }
        </>
    )
}

if (document.getElementById('mainInversores')) {
    const domNode = document.getElementById('mainInversores');
    const root = createRoot(domNode);
    root.render(<MainInversores />);
}
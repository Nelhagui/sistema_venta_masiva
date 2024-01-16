import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaIndexCompras from './TablaIndexCompras';

export default function IndexCompras() {
    const [compras, setCompras] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Realizar la solicitud GET a la API de compras
        fetch('/api/compras')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de compras
                setCompras(data);
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
                    : <TablaIndexCompras compras={compras} />
            }
        </>
    )
}

if (document.getElementById('indexCompras')) {
    const domNode = document.getElementById('indexCompras');
    const root = createRoot(domNode);
    root.render(<IndexCompras />);
}
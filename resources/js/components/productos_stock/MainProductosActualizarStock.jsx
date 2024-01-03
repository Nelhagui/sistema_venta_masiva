import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListaProductosActualizarStock from './TablaListProductosActualizarStock';

export default function MainProductosActualizarStock() {
    const [productos, setProductos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Realizar la solicitud GET a la API de productos
        fetch('/api/productos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de productos
                setProductos(data);
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
                    : <TablaListaProductosActualizarStock productos={productos} />
            }
        </>
    )
}

if (document.getElementById('mainProductosActualizarStock')) {
    const domNode = document.getElementById('mainProductosActualizarStock');
    const root = createRoot(domNode);
    root.render(<MainProductosActualizarStock />);
}
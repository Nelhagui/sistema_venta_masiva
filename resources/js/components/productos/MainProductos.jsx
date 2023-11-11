import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListProductos from './TablaListProductos';
export default function MainProductos() {
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
                    : <TablaListProductos productos={productos} />
            }
        </>
    )
}

if (document.getElementById('mainProductos')) {
    const domNode = document.getElementById('mainProductos');
    const root = createRoot(domNode);
    root.render(<MainProductos />);
}
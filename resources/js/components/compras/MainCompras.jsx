import { createRoot } from 'react-dom/client';
import TablaListCompras from './TablaListCompras';
import React, { useState, useEffect } from 'react'

export default function MainCompras() {
    const [productos, setProductos] = useState([])

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
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }, []);

    return (
        <>
            <TablaListCompras productos={productos}/>
        </>
    )
}

if (document.getElementById('mainCompras')) {
    const domNode = document.getElementById('mainCompras');
    const root = createRoot(domNode);
    root.render(<MainCompras />);
}
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ListProductos from './ListProductos';
export default function MainLector() {
    const [productos, setProductos] = useState([])
    const [metodosDePago, setMetodosDePago] = useState([])
    const [clientes, setClientes] = useState([])
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
            });

        fetch('/api/metodos-pago')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de productos
                setMetodosDePago(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        fetch('/api/clientes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con la lista de productos
                setClientes(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        productos.length > 0
            ? <ListProductos productos={productos} metodosDePago={metodosDePago} clientes={clientes}></ListProductos>
            : null
    )
}

if (document.getElementById('mainLector')) {
    const domNode = document.getElementById('mainLector');
    const root = createRoot(domNode);
    root.render(<MainLector />);
}
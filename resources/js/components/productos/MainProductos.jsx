import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListProductos from './TablaListProductos';
import productoServices from '../../services/productoServices';
import InstructivoSinProductos from './instructivo/InstructivoSinProductos';

export default function MainProductos() {
    const [productos, setProductos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchProductos()
    }, []);

    const fetchProductos = async () => {
        setIsLoading(true);
        try {
            const productosResponse = await productoServices.traerLista();
            setProductos(productosResponse);
            console.log(productosResponse)
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
                    : productos.length > 0
                        ? <TablaListProductos productos={productos} />
                        : <InstructivoSinProductos/>
            }
        </>
    )
}

if (document.getElementById('mainProductos')) {
    const domNode = document.getElementById('mainProductos');
    const root = createRoot(domNode);
    root.render(<MainProductos />);
}
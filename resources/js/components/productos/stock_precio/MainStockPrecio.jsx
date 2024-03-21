import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListStockPrecio from './TablaListStockPrecio';
import productoServices from '../../../services/productoServices';

export default function MainStockPrecio() {
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
                :   <TablaListStockPrecio 
                        productos={productos} 
                    />
        }
        </>
    )
}

if (document.getElementById('mainStockPrecio')) {
    const domNode = document.getElementById('mainStockPrecio');
    const root = createRoot(domNode);
    root.render(<MainStockPrecio />);
}
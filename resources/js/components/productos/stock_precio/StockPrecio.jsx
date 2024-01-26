import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListStockPrecio from './TablaListStockPrecio';
import productoServices from '../../../services/productoServices';
import inversorServices from '../../../services/inversorServices';
import proveedorServices from '../../../services/proveedorServices';

export default function StockPrecio() {
    const [productos, setProductos] = useState([])
    const [inversores, setInversores] = useState([])
    const [proveedores, setProveedores] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchProductos()
        fetchInversores()
        fetchProveedores()
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

    const fetchInversores = async () => {
        setIsLoading(true);
        try {
            const inversoresResponse = await inversorServices.traerLista();
            setInversores(inversoresResponse);
            console.log(inversoresResponse)
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProveedores = async () => {
        setIsLoading(true);
        try {
            const proveedoresResponse = await proveedorServices.traerLista();
            setProveedores(proveedoresResponse);
            console.log(proveedoresResponse)
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
                            inversores={inversores}
                            proveedores={proveedores}
                    />
        }
        </>
    )
}

if (document.getElementById('stockPrecio')) {
    const domNode = document.getElementById('stockPrecio');
    const root = createRoot(domNode);
    root.render(<StockPrecio />);
}
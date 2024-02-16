import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListProveedores from './TablaListProveedores';
import proveedorServices from '../../services/proveedorServices';

export default function MainProveedores() {
    const [proveedores, setProveedores] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchProveedores()
    }, []);

    const fetchProveedores = async () => {
        setIsLoading(true);
        try {
            const proveedoresResponse = await proveedorServices.traerLista()
            setProveedores(proveedoresResponse);
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
                    : <TablaListProveedores proveedores={proveedores} />
            }
        </>
    )
}

if (document.getElementById('mainProveedores')) {
    const domNode = document.getElementById('mainProveedores');
    const root = createRoot(domNode);
    root.render(<MainProveedores />);
}
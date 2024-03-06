import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleInversion from './DetalleInversion';
import inversorServices from '../../../services/inversorServices';
import { DetalleInversorContextProvider } from '../../../context/DetalleInversorContext';
import metodoPagoServices from '../../../services/metodoPagoServices';

export default function MainDetalleInversion() {
    const {pagos, setPagos} = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idParam = params.get('id');
        if (idParam) {
            fetchData(idParam);
        }
    }, []);

    const fetchData = async (idParam) => {
        setIsLoading(true);
        try {
            await Promise.all([
                fetchDetalleInversor(idParam),
                fetchMetodosDePago()
            ]);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };
    
    const fetchDetalleInversor = async (id) => {
        try {
            const dataResponse = await inversorServices.detalleInversor(id);
            setInversor(dataResponse);
            setInversiones(dataResponse.inversiones);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        }
    };
    
    const fetchMetodosDePago = async () => {
        try {
            const response = await metodoPagoServices.traerLista();
            setMetodosDePago(response);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        }
    };

    return (
        <>
            {
                isLoading
                    ? "Cargando..."
                    : <DetalleInversion pagos={pagos} />
            }
        </>
    )
}

if (document.getElementById('MainDetalleInversion')) {
    const domNode = document.getElementById('MainDetalleInversion');
    const root = createRoot(domNode);
    root.render(
        <DetalleInversorContextProvider>
            <MainDetalleInversion />
        </DetalleInversorContextProvider>
    );
}
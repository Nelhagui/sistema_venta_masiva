import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleInversor from './DetalleInversor';
import inversorServices from '../../../services/inversorServices';
import { DetalleInversorContextProvider } from '../../../context/DetalleInversorContext';
import { useDetalleInversorContext } from '../../../context/DetalleInversorContext';
import metodoPagoServices from '../../../services/metodoPagoServices';

export default function MainDetalleInversor({ id }) {
    const {setInversor, setMetodosDePago, setId} = useDetalleInversorContext();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDetalleInversor()
        fetchMetodosDePago()
        setId(id)
    }, [id]);

    const fetchDetalleInversor = async () => {
        setIsLoading(true);
        try {
            const dataResponse = await inversorServices.detalleInversor(id);
            setInversor(dataResponse);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };
    const fetchMetodosDePago = async () => {
        setIsLoading(true);
        try {
            const response = await metodoPagoServices.traerLista();
            setMetodosDePago(response);
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
                    : <DetalleInversor />
            }
        </>
    )
}

if (document.getElementById('mainDetalleInversor')) {
    const domNode = document.getElementById('mainDetalleInversor');
    const id = domNode.dataset.inversorId;
    const root = createRoot(domNode);
    root.render(
        <DetalleInversorContextProvider>
            <MainDetalleInversor id={id} />
        </DetalleInversorContextProvider>
    );
}
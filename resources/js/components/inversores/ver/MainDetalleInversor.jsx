import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DetalleInversor from './DetalleInversor';
import inversorServices from '../../../services/inversorServices';
import { DetalleInversorContextProvider } from '../../../context/DetalleInversorContext';
import { useDetalleInversorContext } from '../../../context/DetalleInversorContext';
import metodoPagoServices from '../../../services/metodoPagoServices';

export default function MainDetalleInversor() {
    const { setInversor, setMetodosDePago, setId, setInversiones } = useDetalleInversorContext();
    const [isLoading, setIsLoading] = useState(true)
    const [msjError, setMsjError] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idParam = params.get('id');
        if (idParam) {
            setId(idParam);
            fetchData(idParam);
        } else {

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
            setMsjError('Error inesperado, contacte con soporte')
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
            setMsjError('Error inesperado, contacte con soporte. Error AH9')
        }
    };

    const fetchMetodosDePago = async () => {
        try {
            const response = await metodoPagoServices.traerLista();
            setMetodosDePago(response);
        } catch (error) {
            setMsjError('Error inesperado, contacte con soporte. Error MH54')
        }
    };

    return (
        <>
            {
                msjError
                    ?
                    <>{msjError}</>
                    :
                    isLoading
                        ? "Cargando..."
                        : <DetalleInversor />
            }
        </>
    )
}

if (document.getElementById('mainDetalleInversor')) {
    const domNode = document.getElementById('mainDetalleInversor');
    const root = createRoot(domNode);
    root.render(
        <DetalleInversorContextProvider>
            <MainDetalleInversor />
        </DetalleInversorContextProvider>
    );
}
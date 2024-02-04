import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MainProximamente from '../proximamente/MainProximamente';
import ventaServices from '../../services/ventaServices';
import TablaListVentas from './TablaListVentas';


export default function MainVentas() {
    const [ventas, setVentas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchModel()
    }, []);

    const fetchModel = async () => {
        setIsLoading(true);
        try {
            console.log('probando')
            const response = await ventaServices.traerLista()
            setVentas(response);
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
                    : <TablaListVentas ventas={ventas} />
            }
            {/* <MainProximamente/> */}
        </>
    )
}

if (document.getElementById('mainVentas')) {
    const domNode = document.getElementById('mainVentas');
    const root = createRoot(domNode);
    root.render(<MainVentas />);
}
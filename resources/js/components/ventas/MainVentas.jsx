import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MainProximamente from '../proximamente/MainProximamente';
import ventaServices from '../../services/ventaServices';
import TablaListVentas from './TablaListVentas';
import InstructivoSinVentas from './instructivos/InstructivoSinVentas';


export default function MainVentas() {
    const [ventas, setVentas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchModel()
    }, []);

    const fetchModel = async () => {
        setIsLoading(true);
        try {
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
                    :
                    <>
                        {
                            ventas.length > 0
                                ?  <TablaListVentas ventas={ventas} />
                                : <InstructivoSinVentas />
                        }
                    </>
            }
        </>
    )
}

if (document.getElementById('mainVentas')) {
    const domNode = document.getElementById('mainVentas');
    const root = createRoot(domNode);
    root.render(<MainVentas />);
}
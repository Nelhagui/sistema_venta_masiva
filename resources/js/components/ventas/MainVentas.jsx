import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ventaServices from '../../services/ventaServices';
import TablaListVentas from './TablaListVentas';
import InstructivoSinVentas from './instructivos/InstructivoSinVentas';


export default function MainVentas() {
    const [ventas, setVentas] = useState([])
    const [caja, setCaja] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchModel()
    }, []);

    const fetchModel = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(window.location.search);
            const queryDate = params.get('fecha');
            const response = await ventaServices.traerLista(queryDate)
            setVentas(response.ventas);
            setCaja(response.sesionCaja);
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
                            ventas?.length > 0
                                ?  <TablaListVentas ventas={ventas} caja={caja} />
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
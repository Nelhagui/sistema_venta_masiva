import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ventaServices from '../../services/ventaServices';
import metodoPagoServices from '../../services/metodoPagoServices';
import TablaListVentas from './TablaListVentas';
import InstructivoSinVentas from './instructivos/InstructivoSinVentas';


export default function MainVentas() {
    const [ventas, setVentas] = useState([])
    const [metodos, setMetodos] = useState([])
    const [cantidadVentas, setCantidadVentas] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, []);

    

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(window.location.search);
            const queryDate = params.get('fecha');

            // Fetch de ventas
            const ventaResponse = await ventaServices.traerLista(queryDate);
            setVentas(ventaResponse.ventas);
            setCantidadVentas(ventaResponse.cantidadVentas);

            // Fetch de métodos de pago
            const metodoPagoResponse = await metodoPagoServices.traerLista();
            setMetodos(metodoPagoResponse);
        } catch (error) {
            // Manejar errores
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
                            cantidadVentas > 0
                                ? <TablaListVentas ventas={ventas} metodos={metodos} />
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
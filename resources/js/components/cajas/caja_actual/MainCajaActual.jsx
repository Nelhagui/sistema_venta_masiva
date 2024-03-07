import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import clienteServices from '../../services/clienteServices';

export default function MainCajaAcual() {
    const [clientes, setClientes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchClientes()
    }, []);

    const fetchClientes = async () => {
        try {
            const clientesResponse = await clienteServices.traerLista();
            setClientes(clientesResponse);
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
                            clientes?.length > 0
                                ? <>
                                    <div className='flex mb-4 justify-end'>
                                        'hola'
                                    </div>
                                </>
                                : "sin caja"
                        }
                    </>
            }
        </>
    )
}

if (document.getElementById('MainCajaAcual')) {
    const domNode = document.getElementById('MainCajaAcual');
    const root = createRoot(domNode);
    root.render(<MainCajaAcual />);
}
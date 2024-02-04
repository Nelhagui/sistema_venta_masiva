import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from "@nextui-org/react";
import ModalCrearMetodoPago from './agregar/ModalCrearMetodoPago';
import metodoPagoServices from '../../services/metodoPagoServices';
import TablaMetodosPago from './TablaMetodosPago';

export default function MainMetodosPago() {
    const [metodosDePago, setMetodosDePago] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchClientes()
    }, []);

    const fetchClientes = async () => {
        setIsLoading(true);
        try {
            const metodoPagoResponse = await metodoPagoServices.traerLista();
            setMetodosDePago(metodoPagoResponse);
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
                         <div className='flex mb-4 justify-end'>
                            <ModalCrearMetodoPago />
                        </div>
                        <TablaMetodosPago metodosDePago={metodosDePago} />
                    </>
            }
        </>
    )
}

if (document.getElementById('mainMetodosPago')) {
    const domNode = document.getElementById('mainMetodosPago');
    const root = createRoot(domNode);
    root.render(<MainMetodosPago />);
}
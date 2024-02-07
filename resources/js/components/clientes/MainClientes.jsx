import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListClientes from './TablaListClientes';
import clienteServices from '../../services/clienteServices';
import { Button } from "@nextui-org/react";
import ModalCrearCliente from './agregar/ModalCrearCliente';
import InstructivoSinClientes from './instructivos/InstructivoSinClientes';

export default function MainClientes() {
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
    const irPaginaAgregarCliente = () => {
        console.log('voy')
    }
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
                                        <ModalCrearCliente />
                                    </div>
                                    <TablaListClientes clientes={clientes} />
                                </>
                                : <InstructivoSinClientes />
                        }
                    </>
            }
        </>
    )
}

if (document.getElementById('mainClientes')) {
    const domNode = document.getElementById('mainClientes');
    const root = createRoot(domNode);
    root.render(<MainClientes />);
}
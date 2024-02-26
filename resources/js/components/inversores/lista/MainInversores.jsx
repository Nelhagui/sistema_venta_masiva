import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TablaListInversores from './TablaListInversores';
import inversorServices from '../../../services/inversorServices';
import InstructivoSinItems from '../instructivos/InstructivoSinItems';

export default function MainInversores() {
    const [inversores, setInversores] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchInversores()
    }, []);

    const fetchInversores = async () => {
        try {
            const dataResponse = await inversorServices.traerLista();
            setInversores(dataResponse);
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
                            inversores?.length > 0
                                ? <TablaListInversores inversores={inversores} />
                                : <InstructivoSinItems />
                        }
                    </>
            }
        </>
    )
}

if (document.getElementById('mainInversores')) {
    const domNode = document.getElementById('mainInversores');
    const root = createRoot(domNode);
    root.render(<MainInversores />);
}
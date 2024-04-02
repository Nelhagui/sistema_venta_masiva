import React, { useState, useEffect } from 'react'
import InputBuscador from './InputBuscador';
import productoServices from '../../../services/productoServices';
import { useLectorContext } from '../../../context/LectorContext';

// import ResultadosBusqueda from './ResultadosBusqueda';

const BuscadorProductos = () => {

    const { setProductos } = useLectorContext()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchListaProductos()
    }, [])

    const fetchListaProductos = async () => {
        try {
            const response = await productoServices.traerLista();
            setProductos(response)
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='flex flex-col w-full'>
                <div className="mt-4 w-full">
                    <div className="flex flex-col relative  dark:bg-neutral-900 bg-neutral-50">
                        <InputBuscador isLoading={isLoading} />
                        <div className="relative border-none">
                            {/* <ResultadosBusqueda /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuscadorProductos
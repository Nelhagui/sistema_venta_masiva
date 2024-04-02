import React from 'react'
import { useLectorContext } from '../../../context/LectorContext'
import { capitalizeToUpperCase, formatearAMoneda } from '../../../utils/utils';

const ResultadosBusqueda = () => {

    const { selectedItemIndex, filtroBusqueda, insertarProductoEnLista } = useLectorContext();

    const seleccionarProducto = (producto) => {
        insertarProductoEnLista(producto)
    };

    return (
        filtroBusqueda.length > 0
            ?
            <div className='absolute top-[2px] w-full max-h-[300px] overflow-y-auto overflow-x-hidden border-x border-b rounded-b-md z-50 dark:bg-neutral-900 bg-neutral-50'>
                {
                    filtroBusqueda.map((producto, index) => {
                        return (
                            <div
                                key={index}
                                className={`dark:bg-neutral-900 bg-neutral-50 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none 
                            ${selectedItemIndex === index
                                        ? "dark:aria-selected:bg-gray-200 dark:aria-selected:text-gray-800 aria-selected:bg-gray-200"
                                        : "dark:hover:bg-white hover:bg-gray-300 hover:text-gray-800"
                                    }`}
                                aria-selected={selectedItemIndex === index ? 'true' : 'false'}
                                tabIndex={0} // Permitir el foco para manejar eventos de teclado
                                onClick={() => seleccionarProducto(producto)}
                            >
                                <div className="flex justify-between w-full px-2 pr-4">
                                    <span>
                                        {capitalizeToUpperCase(producto.titulo)}
                                    </span>
                                    <span>
                                        ${formatearAMoneda(producto.precio)}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            : null
    )
}

export default ResultadosBusqueda
import React from 'react'
import { Input } from "@nextui-org/react";
import { useLectorContext } from '../../../context/LectorContext';
import { SearchIcon } from '../../icons/SearchIcon';
import realizarBusquedaProductos from '../../../utils/realizarBusquedaProductos';

const InputBuscador = ({ isLoading }) => {

    const { setSelectedItemIndex, productos, setFiltroBusqueda, setQuery, query, insertarProductoEnLista } = useLectorContext();

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedItemIndex(prevIndex => (prevIndex === null ? 0 : Math.min(prevIndex + 1, productos.length - 1)));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedItemIndex(prevIndex => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            insertarProductoEnLista()
        }
    };

    const handleTextoBusquedaChange = (event) => {
        const nuevoTextoBusqueda = event.target.value;
        setQuery(nuevoTextoBusqueda);
        realizarBusquedaProductos(nuevoTextoBusqueda, productos, setFiltroBusqueda);
    };

    return (
        <>
            <Input
                isDisabled={isLoading}
                isClearable
                onClear={() => setQuery('')}
                variant="bordered"
                className="w-full sm:max-w-[44%]"
                placeholder="Ingrese el código de barras o título"
                startContent={<SearchIcon />}
                value={query}
                onChange={handleTextoBusquedaChange} 
                style={{ minWidth: '450px' }}
                onKeyDown={handleKeyDown}
            />
        </>
    )
}

export default InputBuscador
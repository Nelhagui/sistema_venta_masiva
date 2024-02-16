import React from 'react'
import ListProductos from './ListProductos'

const ContainerLector = ({ productos, metodosDePago, clientes }) => {
    return (
        <>
            <ListProductos productos={productos} metodosDePago={metodosDePago} clientes={clientes} />
        </>
    )
}

export default ContainerLector
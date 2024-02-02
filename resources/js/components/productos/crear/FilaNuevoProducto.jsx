import React, { useState, useEffect } from 'react'
import { Input, TableRow, TableCell } from "@nextui-org/react";

const FilaNuevoProducto = ({ setArrayProductosCreados }) => {

    const [data, setData] = useState({
        titulo: '',
        codigo_barra: '',
        precio_costo: '',
        precio_venta: '',
        stock_actual: '',
    })

    const handleValue = (event) => {
        const { value, name } = event.target;
        setData({ ...data, [name]: value })
    }

    return (
        <>
        <TableRow key={producto.key}>
            <TableCell>
                <Input
                    variant="bordered"
                    type="text"
                    labelPlacement="outside"
                    isRequired
                    name="titulo"
                    value={data.titulo}
                    onChange={handleValue}
                    // errorMessage={errores[`${producto.key}-titulo`] ? errores[`${producto.key}-titulo`] : ""}
                    // isInvalid={errores[`${producto.key}-titulo`] ? true : false}

                />
            </TableCell>
            <TableCell>
                <Input
                    variant="bordered"
                    isInvalid={false}
                    type="number"
                    labelPlacement="outside"
                    name="codigo_barra"
                    value={data.codigo_barra}
                    onChange={handleValue}
                />
            </TableCell>
            <TableCell>
                <Input
                    variant="bordered"
                    type="number"
                    labelPlacement="outside"
                    name="precio_costo"
                    value={data.precio_costo}
                    onChange={handleValue}
                    // errorMessage={errores[`${producto.key}-precio_costo`] ? errores[`${producto.key}-precio_costo`] : ""}
                    // isInvalid={errores[`${producto.key}-precio_costo`] ? true : false}
                />
            </TableCell>
            <TableCell>
                <Input
                    variant="bordered"
                    type="number"
                    labelPlacement="outside"
                    name="precio_venta"
                    value={data.precio_venta}
                    onChange={handleValue}
                    // errorMessage={errores[`${producto.key}-precio_venta`] ? errores[`${producto.key}-precio_venta`] : ""}
                    // isInvalid={errores[`${producto.key}-precio_venta`] ? true : false}
                />
            </TableCell>
            <TableCell>
                <Input
                    variant="bordered"
                    type="number"
                    labelPlacement="outside"
                    name="stock_actual"
                    value={data.stock_actual}
                    onChange={handleValue}
                    // errorMessage={errores[`${producto.key}-stock_actual`] ? errores[`${producto.key}-stock_actual`] : ""}
                    // isInvalid={errores[`${producto.key}-stock_actual`] ? true : false}
                />
            </TableCell>
        </TableRow>
        </>
    )
}

export default FilaNuevoProducto
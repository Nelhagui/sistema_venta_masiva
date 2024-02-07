import React from 'react'
import {
    Input,
} from "@nextui-org/react";
import { exedeLimiteDecimales } from '../../../utils/utils';
const InputCantidadTipoProducto = ({ productoSeleccionado, handleInputFraccionChangeCantidad, handleInputChangeCantidadUnidad, handleInputFraccionChangeMonto, handleInputChangeVentaAdicional }) => {
    const tipo = productoSeleccionado.tipo;
    let content = (
        <input 
            type="number"
            name="cantidad"
            value={productoSeleccionado.cantidad}
            step="1"
            style={{
                textAlign: "left",
                maxWidth: "6rem",
                padding: "6px",
                paddingLeft: '15px',
                borderRadius: '8px',
                backgroundColor: '#f4f4f5'
            }}
            min="0" // Valor mínimo permitido
            onChange={(e) => { handleInputChangeCantidadUnidad(e, productoSeleccionado); }}
        />
    );

    if (tipo === 'fraccion') {
        content = (
            <div className='flex gap-2'>
                <div className='flex flex-col'>
                    <div style={{ maxWidth: '6rem' }}>
                        <Input
                            label="Peso"
                            type='number'
                            labelPlacement="outside"
                            size='sm'
                            step="0.02"
                            className='max-w-4'
                            placeholder="peso"
                            value={productoSeleccionado.cantidad}
                            onChange={(e) => handleInputFraccionChangeCantidad(e, productoSeleccionado)}
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div style={{ maxWidth: '7rem' }}>
                        <Input
                            label="Monto"
                            type='number'
                            labelPlacement="outside"
                            size='sm'
                            step="0.01"
                            className='max-w-4'
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            placeholder="Ingrese monto"
                            value={exedeLimiteDecimales(productoSeleccionado.monto) ? productoSeleccionado.monto.toFixed(2) : productoSeleccionado.monto}
                            onChange={(e) => handleInputFraccionChangeMonto(e, productoSeleccionado)}
                        />
                    </div>
                </div>
            </div>
        );

    } else if (tipo === "costo_adicional") {

        content = (
            <div className='flex gap-2'>
                <div className='flex flex-col'>
                    <div style={{ maxWidth: '6rem' }}>
                        <Input
                            label="Venta"
                            type='number'
                            name="precio_costo"
                            labelPlacement="outside"
                            size='sm'
                            className='max-w-4'
                            placeholder="venta"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            value={productoSeleccionado.precio_costo}
                            onChange={(e) => { handleInputChangeVentaAdicional(e, productoSeleccionado); }}
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div style={{ maxWidth: '7rem' }}>
                        <Input
                            label="Adicional"
                            type='number'
                            name="precio_venta"
                            placeholder="adicional"
                            labelPlacement="outside"
                            size='sm'
                            className='max-w-4'
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            value={productoSeleccionado?.precio_venta}
                            onChange={(e) => { handleInputChangeVentaAdicional(e, productoSeleccionado); }}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return content;
}

export default InputCantidadTipoProducto
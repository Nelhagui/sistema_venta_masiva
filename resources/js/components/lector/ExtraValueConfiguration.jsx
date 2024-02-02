import React, { useState, useEffect } from 'react'
import { ChangesInPaymentIcon } from '../icons/ChangesInPaymentIcon.jsx';
import { useLectorContext } from '../../context/LectorContext.jsx';
import {
    Input,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";

const ExtraValueConfiguration = () => {
    const {
        total,
        vuelto,
        setVuelto,
        setAumento,
        setDescuento,
        aumento,
        descuento,
        tipoVariableDescuento,
        setTipoVariableDescuento,
        tipoVariableAumento,
        setTipoVariableAumento
    } = useLectorContext()
    const [vueltoInitial, setVueltoInitial] = useState('')
    const [cambioIngresado, setCambioIngresado] = useState(0);

    useEffect(() => {
        if (cambioIngresado > 0)
            setVuelto(Number(cambioIngresado) - Number(total));
    }, [total])


    const cambioTipoAumento = (e) => {
        const value = e.target.value;
        if (value === '1') {
            setTipoVariableAumento('$')
        } else {
            setTipoVariableAumento('%')
        }
    }

    const cambioTipoDescuento = (e) => {
        const value = e.target.value;
        if (value === '1') {
            setTipoVariableDescuento('$')
        } else {
            setTipoVariableDescuento('%')
        }
    }

    const handleVueltoChange = (e) => {
        const valueIn = e.target.value;
        const totalIn = Number(valueIn) - Number(total);
        setVuelto(totalIn);
        setCambioIngresado(valueIn)
        setVueltoInitial(valueIn)
    };

    const handleAumentoChange = (e) => {
        const aumentoValue = e.target.value;
        const isValidNumber = /^(0(\.\d+)?|[1-9]\d*(\.\d*)?)?$/.test(aumentoValue);
        if (isValidNumber) {
            setAumento(aumentoValue);
        }
        setDescuento('');
    };
    const handleDescuentoChange = (e) => {

        const descuentoValue = e.target.value;
        const isValidNumber = /^(0(\.\d+)?|[1-9]\d*(\.\d*)?)?$/.test(descuentoValue);
        if (isValidNumber) {
            setDescuento(descuentoValue);
        }
        setAumento('');
    };

    return (
        <Accordion
            isCompact
            variant="bordered"
            className='mb-4'
            selectionMode="multiple"
        >
            <AccordionItem
                key="1"
                aria-label="Accordion 1"
                startContent={
                    <ChangesInPaymentIcon />
                }
                subtitle="Vuelto, Aumentos y Descuentos"
            >
                <div className='flex mb-4 justify-between'>
                    <div className='flex gap-3'>
                    <Input
                            className='w-2/5'
                            type="number"
                            size='sm'
                            label="Vuelto"
                            placeholder="0.00"
                            defaultValue={vueltoInitial}
                            onChange={handleVueltoChange}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                        />
                        {
                            vuelto > 0
                                ?
                                <div className='ml-2 text-green-600 text-xl'>
                                    ${vuelto}
                                </div>
                                :
                                cambioIngresado > 0 && vuelto !== 0
                                    ?
                                    <div className='ml-2 text-red-600'>
                                        monto incompleto
                                    </div>
                                    : null
                        }
                        <Input
                            label="Aumento"
                            className='w-2/5'
                            size='sm'
                            placeholder="0.00"
                            defaultValue={aumento}
                            value={aumento}
                            onChange={handleAumentoChange}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">{tipoVariableAumento}</span>
                                </div>
                            }
                            endContent={
                                <div className="flex items-center">
                                    <label className="sr-only" htmlFor="aumento">
                                        Aumento
                                    </label>
                                    <select
                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                        id="aumento"
                                        name="aumento"
                                        onChange={(e) => cambioTipoAumento(e)}
                                    >
                                        <option value="1">$</option>
                                        <option value="2">%</option>
                                    </select>
                                </div>
                            }
                            type="number"
                        />
                        <Input
                            label="Descuento"
                            className='w-2/5'
                            size='sm'
                            placeholder="0.00"
                            defaultValue={descuento}
                            value={descuento}
                            onChange={handleDescuentoChange}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">{tipoVariableDescuento}</span>
                                </div>
                            }
                            endContent={
                                <div className="flex items-center">
                                    <label className="sr-only" htmlFor="descuento">
                                        Descuento
                                    </label>
                                    <select
                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                        id="descuento"
                                        name="descuento"
                                        onChange={(e) => cambioTipoDescuento(e)}
                                    >
                                        <option value="1">$</option>
                                        <option value="2">%</option>
                                    </select>
                                </div>
                            }
                            type="number"
                        />
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    )
}

export default ExtraValueConfiguration
import React, { useState, useEffect } from 'react'
import { useLectorContext } from '../../../context/LectorContext.jsx';
import {
    Input,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";

const Vuelto = () => {
    const { total, vuelto, setVuelto } = useLectorContext()
    const [vueltoInitial, setVueltoInitial] = useState('')
    const [cambioIngresado, setCambioIngresado] = useState(0);

    const handleVueltoChange = (e) => {
        const valueIn = e.target.value;
        const totalIn = Number(valueIn) - Number(total);
        setVuelto(totalIn);
        setCambioIngresado(valueIn)
        setVueltoInitial(valueIn)
    };

    useEffect(() => {
        if (cambioIngresado > 0)
            setVuelto(Number(cambioIngresado) - Number(total));
    }, [total])

    return (
        <>
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
        </>
    )
}

export default Vuelto
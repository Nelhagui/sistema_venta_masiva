import React, { useEffect, useLayoutEffect, useState } from 'react'

const InputMetodoPago = ({ name, metodos, handleChangeMetodoPago, setMetodosSeleccionados, metodosAgregados, setMontoTotalMarkups, montoTotalMarkups }) => {

    const [value, setValue] = useState('');
    const [metodoValue, setMetodoValue] = useState('');
    const [metodoNombre, setMetodoNombre] = useState('');
    const [markup, setMarkup] = useState(null)
    const [tipoMarkup, setTipoMarkup] = useState(null)

    const handleChangeMonto = (e) => {
        const { value, name } = e.target;
        setValue(value);

        const metodoSeleccionado = metodos.find((metodo) => metodo.id == metodoValue);
        setMarkup(metodoSeleccionado.markup);
        setTipoMarkup(metodoSeleccionado.tipo_markup);

        const nuevoMetodo = {
            nombre: metodoNombre,
            metodo_pago_id: metodoValue,
            monto_abonado: value,
            selectorName: name, 
            markup: metodoSeleccionado.markup,
            tipo_markup: metodoSeleccionado.tipo_markup
        };


        setMetodosSeleccionados(prevMetodos => {
            const indiceExistente = prevMetodos?.findIndex(metodo => metodo?.selectorName === name);
            
            if (indiceExistente >= 0) {
                return prevMetodos.map((metodo, indice) =>
                    indice === indiceExistente ? nuevoMetodo : metodo
                );
            }
        });
        console.log(metodosAgregados)
    }

    const handleSelection = (e) => {
        handleChangeMetodoPago(e)
        setMetodoValue(e.target.value);
        setMetodoNombre(e.target.options[e.target.selectedIndex].text);
    };

    useEffect(() => {
        
    }, [])
    
    return (
        <div className='flex my-2'>
            <select onChange={handleSelection} name={name} className='text-sm'>
                <option value="">Seleccionar método de pago</option>
                {metodos?.map((metodo) => (
                    <option key={metodo?.id} value={metodo?.id}>
                        {metodo?.nombre}
                    </option>
                ))}
            </select>
            <input
                name={name}
                type='number'
                value={value}
                onChange={handleChangeMonto}
                style={{maxWidth: "100px"}}
            />
            {
                tipoMarkup == 1 &&
                <div className='flex items-center px-2'>
                    <p>+{markup}% +${Number(value*markup/100)}</p>
                </div>
            }
            {
                tipoMarkup == 2 &&
                <div className='flex items-center px-2'>
                    <p>+${markup}</p>
                </div>
            }
        </div>
    )
}

export default InputMetodoPago
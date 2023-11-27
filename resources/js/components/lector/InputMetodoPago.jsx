import React, { useEffect, useState } from 'react'

const InputMetodoPago = ({ name, metodos, handleChangeMetodoPago, setMetodosSeleccionados }) => {

    const [value, setValue] = useState('');
    const [metodoValue, setMetodoValue] = useState('');
    const [metodoNombre, setMetodoNombre] = useState('');

    const handleChangeMonto = (e) => {
        const { value, name } = e.target;
        setValue(value);
        const nuevoMetodo = {
            nombre: metodoNombre,
            metodo_pago_id: metodoValue,
            monto_abonado: value,
            selectorName: name, 
        };
        setMetodosSeleccionados(prevMetodos => {
            const indiceExistente = prevMetodos?.findIndex(metodo => metodo?.selectorName === name);
            if (indiceExistente >= 0) {
                return prevMetodos.map((metodo, indice) =>
                    indice === indiceExistente ? nuevoMetodo : metodo
                );
            }
        });
    }

    const handleSelection = (e) => {
        handleChangeMetodoPago(e)
        setMetodoValue(e.target.value);
        setMetodoNombre(e.target.options[e.target.selectedIndex].text);
    };
    return (
        <div className='flex'>
            <select onChange={handleSelection} name={name}>
                <option value="">Seleccionar segundo método de pago</option>
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
            />
        </div>
    )
}

export default InputMetodoPago
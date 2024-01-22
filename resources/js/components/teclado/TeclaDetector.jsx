import React, { useEffect } from 'react';

const TeclaDetector = ({ onKeyPress }) => {

    const handleKeyPress = (event) => {
        console.log('Tecla presionada:', event.key);

        // Puedes realizar acciones específicas según la tecla presionada
        if (event.key === 'Enter') {
            console.log('Enter presionado. Realizar alguna acción.');

            // Ejecutar la función proporcionada desde las props
            onKeyPress && onKeyPress();
        } else if (event.key === "F12") {
            onKeyPress && onKeyPress();
        }
    };

    useEffect(() => {
        // Agregar un event listener cuando el componente se monta
        window.addEventListener('keydown', handleKeyPress);

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onKeyPress]); // El effect se ejecuta al montar y desmontar el componente, o cuando onKeyPress cambia

    // No renderizar nada
    return null;
};

export default TeclaDetector;

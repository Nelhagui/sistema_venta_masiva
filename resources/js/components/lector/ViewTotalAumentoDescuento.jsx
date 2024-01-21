import React from 'react'
import { useLectorContext } from '../../context/LectorContext'

const ViewTotalAumentoDescuento = () => {
    const { total, aumento, descuento, obtenerTotalSinModificaciones } = useLectorContext();

    const esAumento = aumento > 0;
    const esDescuento = descuento > 0;

    const renderAumentoODescuento = () => {
        if (esAumento) {
            return (
                <div className='flex'>
                    <div>
                        <p style={{ fontSize: 55, lineHeight: 1 }}> ${Number(total)} </p>
                        <p style={{ opacity: 0.5, textAlign: 'center' }}>${obtenerTotalSinModificaciones()}</p>
                    </div>
                    <p style={{ marginLeft: 10, color: 'green' }}>+ ${aumento}</p>
                </div>
            );
        }

        if (esDescuento) {
            // Lógica para renderizar el componente de descuento si es necesario
            // Puedes personalizar esto según tus necesidades
            return (
                <div className='flex'>
                    <div>
                        <p style={{ fontSize: 55, lineHeight: 1 }}> ${Number(total)} </p>
                        <p style={{ opacity: 0.5, textAlign: 'center' }}>${obtenerTotalSinModificaciones()}</p>
                    </div>
                    <p style={{ marginLeft: 10, color: 'red' }}>- ${descuento}</p>
                </div>
            );
        }

        // Si no hay aumento ni descuento, solo mostrar el total
        return <p style={{ fontSize: 55, lineHeight: 1 }}> ${total} </p>;
    };

    return (
        <div className='flex flex-col'>
            <div>{renderAumentoODescuento()}</div>
        </div>
    );
    // return (
    //     <div className='flex flex-col'>
    //         <div>
    //             {
    //                 aumento > 0 || descuento > 0
    //                     ?
    //                     <div className='flex'>
    //                         <div>
    //                             <p style={{ fontSize: 55, lineHeight: 1 }}> ${Number(total)} </p>
    //                             <p style={{ opacity: 0.5, textAlign: 'center' }}>${obtenerTotalSinModificaciones()}</p>
    //                         </div>
    //                         <p style={{ marginLeft: 10, color: 'green' }}>+ ${aumento}</p>
    //                     </div>
    //                     : <p style={{ fontSize: 55, lineHeight: 1 }}> ${total} </p>
    //             }
    //         </div>
    //     </div>
    // )
}

export default ViewTotalAumentoDescuento
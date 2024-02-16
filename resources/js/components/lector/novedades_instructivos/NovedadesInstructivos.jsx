import React from 'react'
import TabsSecciones from './TabsSecciones';

const NovedadesInstructivos = () => {
    return (
        <>
            <div className="my-9" style={{ marginTop: 25 }}>
                <h2 className="antialiased font-medium tracking-wide" style={{ fontSize: 32 }}>
                    Novedades
                </h2>
                <p className='text-descripcion'>
                    Descubre las novedades que te ayudaran a potenciar tu negocio
                </p>
            </div>
            <TabsSecciones />
        </>
    )
}

export default NovedadesInstructivos
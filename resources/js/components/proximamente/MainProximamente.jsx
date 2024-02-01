import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

export default function MainProximamente() {

    return (
        <div style={{marginTop: '40px'}}>
             <h2 className="antialiased font-medium tracking-wide text-center" style={{ fontSize: 52 }}>
                PRÓXIMAMENTE
            </h2>
            <p className='text-center text-descripcion' style={{ fontSize: 22 }}>
                Estamos trabajando en esta funcionalidad. Muy pronto podrás visualizarla. 
            </p>
        </div>
    )
}


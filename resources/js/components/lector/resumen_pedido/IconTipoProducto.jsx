import React from 'react'
import {
    Tooltip,
} from "@nextui-org/react";

const IconTipoProducto = ({ tipo }) => {
    let content = null;
    let tipoClase = null;

    if (tipo === 'fraccion') {
        content = (
            <div className="tooltip-content">
                <div className="tooltip-title">Fracción</div>
                <div className="tooltip-description">0.100 para 100gr</div>
                <div className="tooltip-description">1 para 1kg</div>
            </div>
        );
        tipoClase = "tipo-fraccion";
    } else if (tipo === "costo_adicional") {
        content = (
            <div className="tooltip-content">
                <div className="tooltip-title">Adicional</div>
                <div className="tooltip-description">Debe ingresar valor y adicional por separado</div>
            </div>
        );
        tipoClase = "tipo-adicional";
    }
    return (
        <div style={{position: 'absolute'}}>
            {content && (
                <Tooltip content={content}>
                    <div className={tipoClase}>
                        {tipo === 'fraccion' ? 'F' : tipo === 'costo_adicional' ? 'A' : null}
                    </div>
                </Tooltip>
            )}
        </div>
    )
}

export default IconTipoProducto
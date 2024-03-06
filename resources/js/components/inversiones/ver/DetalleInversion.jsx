import React from "react";
import TablaListPagos from "../pagos/TablaListPagos";

export default function DetalleInversion({pagos}) {
    return (
        <>
            <div className="flex w-full flex-col">
                <TablaListPagos pagos={pagos}/>
            </div>
        </>
    );
}

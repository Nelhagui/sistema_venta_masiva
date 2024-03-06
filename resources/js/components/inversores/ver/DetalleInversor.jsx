import React from "react";
import { useDetalleInversorContext } from "../../../context/DetalleInversorContext";
import TablaInversiones from "./inversion/TablaInversiones";

export default function DetalleInversor() {
    const [selected, setSelected] = React.useState("deudas");
    const { inversiones } = useDetalleInversorContext();


    return (
        <>
            <div className="flex w-full flex-col">
                <TablaInversiones />
            </div>
        </>
    );
}

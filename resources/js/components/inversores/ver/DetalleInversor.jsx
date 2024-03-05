import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TablaVentas from "./ventas/TablaVentas";
import DatosCliente from "./datos/DatosCliente";
import { capitalizeToLowerCase } from "../../../utils/utils";
import { useDetalleInversorContext } from "../../../context/DetalleInversorContext";
import TablaDeudasInversor from "./deuda/TablaDeudasInversor";
import ModalCrearInversion from "../agregar/ModalCrearInversion";

export default function DetalleInversor() {
    const [selected, setSelected] = React.useState("deudas");
    const { inversor } = useDetalleInversorContext();


    return (
        <>
            <div className="my-9" style={{ marginTop: 25, marginBottom: 25, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2 className="antialiased font-medium tracking-wide text-left" style={{ fontSize: 32 }}>
                        {capitalizeToLowerCase(inversor?.nombre)}
                    </h2>
                    <p className='text-left text-descripcion'>
                        Desde esta sección puedes visualizar las inversiones de este usuario.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ModalCrearInversion />
                </div>
            </div>
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                >
                    <Tab key="deudas" title="Deudas">
                        <Card>
                            <CardBody>
                                <TablaDeudasInversor />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="ventas" title="Ventas">
                        <Card>
                            <CardBody>
                                <TablaVentas />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="datos" title="Datos">
                        <Card>
                            <CardBody>
                                <DatosCliente />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

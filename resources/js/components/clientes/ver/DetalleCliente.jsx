import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TablaDeudas from "./deuda/TablaDeudas";
import TablaVentas from "./ventas/TablaVentas";
import DatosCliente from "./datos/DatosCliente";
import { useDetalleClienteContext } from "../../../context/DetalleClienteContext";
import { capitalizeToLowerCase } from "../../../utils/utils";

export default function DetalleCliente() {
    const [selected, setSelected] = React.useState("deudas");
    const { cliente } = useDetalleClienteContext();

    return (
        <>
            <div className="my-9" style={{ marginTop: 25, marginBottom: 25 }}>
                <h2 className="antialiased font-medium tracking-wide text-left" style={{ fontSize: 32 }}>
                    {capitalizeToLowerCase(cliente?.nombre)}
                </h2>
                <p className='text-left text-descripcion'>
                    Desde esta sección puedes ver y editar las deudas y sus datos personales como visualizar las ventas a este cliente.
                </p>
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
                                <TablaDeudas />
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

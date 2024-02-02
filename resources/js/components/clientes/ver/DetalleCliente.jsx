import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TablaDeudas from "./deuda/TablaDeudas";
import TablaVentas from "./ventas/TablaVentas";
import DatosCliente from "./datos/DatosCliente";

export default function DetalleCliente() {
    const [selected, setSelected] = React.useState("deudas");

    return (
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
                            <TablaVentas/>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="datos" title="Datos">
                    <Card>
                        <CardBody>
                            <DatosCliente/>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}

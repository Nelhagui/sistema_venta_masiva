import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TablaDeudas from "./deuda/TablaDeudas";
import TablaVentas from "./ventas/TablaVentas";

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
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}

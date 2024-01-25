import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import TablaDeudas from "./TablaDeudas";

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
              <TablaDeudas/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="ventas" title="Ventas">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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

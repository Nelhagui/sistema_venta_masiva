import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { InventoryIcon } from "../../icons/InventoryIcon";
import { ProductsIcon } from "../../icons/ProductsIcon";

export default function TabsSecciones() {
    return (
        <div className="flex w-full flex-col mt-10">
            <Tabs aria-label="Options" color="primary" variant="bordered">
                <Tab
                    key="productos"
                    title={
                        <div className="flex items-center space-x-2 gap-1">
                            <ProductsIcon />
                            <span>Productos</span>
                        </div>
                    }
                >
                    <Card>
                        <CardBody>
                            <div className="my-9" style={{ marginTop: 25 }}>
                                <h3 className="antialiased font-medium tracking-wide" style={{ fontSize: 24 }}>
                                    Novedades
                                </h3>
                                <p className='text-descripcion'>
                                    Descubre las novedades que te ayudaran a potenciar tu negocio
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </ Tab>
                <Tab
                    key="music"
                    title={
                        <div className="flex items-center space-x-2">
                            <InventoryIcon />
                            <span>Music</span>
                        </div>
                    }
                />
                <Tab
                    key="videos"
                    title={
                        <div className="flex items-center space-x-2">
                            <InventoryIcon />
                            <span>Videos</span>
                        </div>
                    }
                />
            </Tabs>
        </div>
    );
}

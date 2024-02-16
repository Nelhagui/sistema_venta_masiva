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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

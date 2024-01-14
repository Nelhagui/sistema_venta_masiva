import React from "react";
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio, Input } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const colors = ["default", "primary", "secondary", "success", "warning", "danger"];
export default function MainLogin() {
    const [selectedColor, setSelectedColor] = React.useState("default");

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // useEffect(() => {
    //     // Realizar la solicitud GET a la API de productos
    //     fetch('/api/productos')
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             // Actualizar el estado con la lista de productos
    //             setProductos(data);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="email" label="Email" />
                <Input type="email" label="Email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col gap-3">
                <Table
                    color={selectedColor}
                    selectionMode="multiple"
                    defaultSelectedKeys={["2", "3"]}
                    aria-label="Example static collection table"
                >
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Zoey Lang</TableCell>
                            <TableCell>Technical Lead</TableCell>
                            <TableCell>Paused</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Jane Fisher</TableCell>
                            <TableCell>Senior Developer</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>William Howard</TableCell>
                            <TableCell>Community Manager</TableCell>
                            <TableCell>Vacation</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <RadioGroup
                    label="Selection color"
                    orientation="horizontal"
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                >
                    {colors.map((color) => (
                        <Radio
                            key={color}
                            color={color}
                            value={color}
                            className="capitalize"
                        >
                            {color}
                        </Radio>
                    ))}
                </RadioGroup>
            </div>
        </>
    )
}

if (document.getElementById('mainLogin')) {
    const domNode = document.getElementById('mainLogin');
    const root = createRoot(domNode);
    root.render(<MainLogin />);
}
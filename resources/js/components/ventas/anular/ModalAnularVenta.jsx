import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import ventaServices from "../../../services/ventaServices";

export default function ModalAnularVenta({ idVenta }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmarAnular = () => {
        handleSubmit();
        console.log('epa')
    };

    const handleSubmit = async () => {
        console.log('voy')
        setIsLoading(true);
        try {
            const response = await ventaServices.anularVenta(idVenta);
            const data = await response.json();
            if (response.status !== 200) {
                alert('fallado')
            } else {
                alert('anulado')
            }
        } catch (error) {
            alert('error')
        } finally {
            setIsLoading(false);
            onOpenChange()
        }
    };

    return (
        <>
            <p onClick={onOpen} style={{ cursor: 'pointer' }}>Anular</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Anular Venta</ModalHeader>
                            <ModalBody>
                                <p className="text-center" style={{ color: 'red' }}>
                                    Estás a punto de anular una venta.
                                    <br />
                                    Esta acción no se puede deshacer
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    isDisabled={isLoading}
                                    color="primary"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    isDisabled={isLoading}
                                    color="danger"
                                    onPress={isLoading ? null : handleConfirmarAnular}
                                >
                                    {
                                        isLoading ?
                                            <>
                                                <Spinner color="default" size="sm" />  Procesando...
                                            </>

                                            : "Anular Venta"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

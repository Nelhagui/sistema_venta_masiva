import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import metodoPagoServices from "../../../services/metodoPagoServices.js";
import { DeleteIcon } from "../../icons/DeleteIcon.jsx";
import { WarningIcon } from "../../icons/WarningIcon.jsx";

export default function ModalEliminarMetodoPago({ item }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isDisabled, setIsDisabled] = useState(true)
    const [inputText, setInputText] = useState("")
    const [msjErrors, setMsjErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setInputText("")
        setMsjErrors(null)
        setIsDisabled(true);
    }, [isOpen])

    useEffect(() => {
        if (inputText === "eliminar")
            setIsDisabled(false)
        else
            setIsDisabled(true)
    }, [inputText])

    const onChangeValue = (event) => {
        setInputText((event.target.value.toLowerCase()).trim())
    }

    const onPressSubmit = () => {
        if (inputText !== "eliminar")
            setMsjErrors("Ingrese la palabra 'eliminar' para confirmar");
        else
            fetchEliminarEvento()
    }

    const fetchEliminarEvento = async () => {
        setIsLoading(true);
        try {
            const response = await metodoPagoServices.eliminar(item)
            const data = await response.json();
            if (response.status === 400) {
                setMessage(data.message);
            } else {
                // tiene que haber un context. 
                console.log('bien')
            }
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DeleteIcon onClick={onOpen} />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1" style={{paddingBottom: 0}}>{item.nombre}</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center">
                                    <WarningIcon width={90} fill="red" />
                                    <p style={{ color: "red" }}>ATENCIÓN</p>
                                    <p style={{ color: "red" }}>Esta acción no se puede deshacer</p>
                                </div>
                                <div className="flex justify-center text-center my-5">
                                    <p style={{ fontSize: 16 }}>Para confirmar la operación  ingrese <br />   la palabra <strong>"eliminar"</strong></p>
                                </div>
                                <Input
                                    autoFocus
                                    isRequired
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    value={inputText}
                                    onChange={onChangeValue}
                                // isInvalid={msjErrors.nombre ? true : false}
                                // errorMessage={msjErrors.nombre ?? ''}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onPressSubmit}
                                    isDisabled={isDisabled || isLoading}
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onClose}
                                    isDisabled={isLoading}
                                >
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
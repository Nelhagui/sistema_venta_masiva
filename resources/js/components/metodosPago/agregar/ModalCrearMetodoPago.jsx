import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, Input } from "@nextui-org/react";
import { PlusIcon } from "../../icons/PlusIcon.jsx";
import metodoPagoServices from "../../../services/metodoPagoServices.js";

export default function ModalCrearMetodoPago() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isDisabled, setIsDisabled] = useState(false)
    const [camposObligatorios] = useState(['nombre'])

    const [data, setData] = useState({})
    const [msjError, setMsjError] = useState({
        nombre: null,
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setData({
            nombre: '',
        })
        setMsjError(null)
        setIsDisabled(true);
    }, [isOpen])

    useEffect(() => {
        const todosCamposLlenos = camposObligatorios.every(campo => data[campo] !== '' && data[campo] !== null);
        setIsDisabled(!todosCamposLlenos)
    }, [data, camposObligatorios])


    const onChangeValue = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }

    const onPressSubmit = () => {
        let errores = [];
        let objetoErrores = {};
        camposObligatorios.forEach((campo) => {
            if (!data[campo] || data[campo] === "") {
                errores.push(`El campo ${campo} es obligatorio.`);
                objetoErrores[campo] = "campo obligatorio";
            }
        });
        if (errores.length > 0) {
            setMsjError({ ...msjError, ...objetoErrores });
        } else {
            fetchService();
        }
    }

    const fetchService = async () => {
        setIsLoading(true);
        try {
            const response = await metodoPagoServices.crear(data);
            if (response.status === 200) {
                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Button
                className="bg-foreground text-background"
                endContent={<PlusIcon />}
                onClick={onOpen}
            >
                Crear Método de Pago
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nuevo Método de Pago</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired={camposObligatorios.includes('nombre')}
                                    label="Nombre"
                                    placeholder="Ingresa el nombre de método"
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    name="nombre"
                                    value={data.nombre}
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.nombre ?? false}
                                    errorMessage={msjError?.nombre ?? ''}
                                />
                            </ModalBody>
                            <ModalFooter className="mt-2">
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                    isDisabled={isLoading}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onPressSubmit}
                                    isDisabled={isDisabled || isLoading}
                                >
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

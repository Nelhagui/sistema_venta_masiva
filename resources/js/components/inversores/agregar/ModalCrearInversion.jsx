import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, Input } from "@nextui-org/react";
import { PlusIcon } from "../../icons/PlusIcon.jsx";
import inversorServices from "../../../services/inversorServices.js";

export default function ModalCrearInversion() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isDisabled, setIsDisabled] = useState(false)
    const [camposObligatorios] = useState(['fecha_inversion', 'monto_invertido', 'porcentaje_ganancia'])

    const [data, setData] = useState({})
    const [msjError, setMsjError] = useState({
        fecha_inversion: null,
        monto_invertido: null,
        porcentaje_ganancia: null
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setData({
            fecha_inversion: '',
            monto_invertido: '',
            porcentaje_ganancia: ''
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
            const response = await inversorServices.crearInversor(data);
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
                Crear Inversión
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nueva Inversión</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired={camposObligatorios.includes('fecha_inversion')}
                                    label="Fecha de Inversión"
                                    placeholder="Ingresa la fecha"
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    name="fecha_inversion"
                                    value={data.fecha_inversion}
                                    type="date"
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.fecha_inversion ?? false}
                                    errorMessage={msjError?.fecha_inversion ?? ''}
                                />
                                <Input
                                    isRequired={camposObligatorios.includes('monto_invertido')}
                                    label="Monto Invertido"
                                    placeholder="Ingrese el monto"
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    name="monto_invertido"
                                    type="number"
                                    value={data?.monto_invertido}
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.monto_invertido ?? false}
                                    errorMessage={msjError?.monto_invertido ?? ''}
                                />
                                <Input
                                    isRequired={camposObligatorios.includes('porcentaje_ganancia')}
                                    label="Ganancia"
                                    placeholder="Ingrese el porcentaje de ganancia"
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    name="porcentaje_ganancia"
                                    type="number"
                                    value={data?.porcentaje_ganancia}
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.porcentaje_ganancia ?? false}
                                    errorMessage={msjError?.porcentaje_ganancia ?? ''}
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

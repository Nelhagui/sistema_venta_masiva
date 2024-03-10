import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, Input, Select } from "@nextui-org/react";
import { PlusIcon } from "../../../icons/PlusIcon.jsx";
import inversionesServices from "../../../../services/inversionesServices.js";

export default function ModalCrearPago({ id }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isDisabled, setIsDisabled] = useState(false)
    const [camposObligatorios] = useState(['fecha_pago', 'monto_abonado'])

    const [data, setData] = useState({})
    const [msjError, setMsjError] = useState({
        inversion_id: id,
        fecha_pago: null,
        monto_abonado: null,
        nota: null,
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setData({
            inversion_id: id,
            fecha_pago: formattedDate,
            monto_abonado: '',
            nota: ''
        })
        setMsjError(null)
        setIsDisabled(true);
    }, [isOpen, id])

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
            const response = await inversionesServices.crearPago(data)
            if (response.status === 200) {
                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
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
                Cargar Pago
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cargar Pago</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired={camposObligatorios.includes('fecha_pago')}
                                    label="Fecha del Pago"
                                    placeholder="Ingresa la fecha"
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    name="fecha_pago"
                                    value={data.fecha_pago}
                                    type="date"
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.fecha_pago ?? false}
                                    errorMessage={msjError?.fecha_pago ?? ''}
                                />
                                <Input
                                    isRequired={camposObligatorios.includes('monto_abonado')}
                                    label="Monto Abonado"
                                    placeholder="Ingrese el monto"
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    name="monto_abonado"
                                    type="number"
                                    value={data?.monto_abonado}
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.monto_abonado ?? false}
                                    errorMessage={msjError?.monto_abonado ?? ''}
                                />
                                <div className="w-full flex flex-col gap-2 max-w-[240px]">
                                    <Textarea
                                        variant="bordered"
                                        label="Nota"
                                        name="nota"
                                        placeholder="Ingrese una nota"
                                        value={data?.nota}
                                        onChange={onChangeValue}
                                    />
                                </div>
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

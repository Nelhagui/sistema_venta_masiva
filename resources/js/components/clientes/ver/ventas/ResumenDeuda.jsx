import React, { useEffect, useState } from 'react'
import { CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import estadoCompraUtils from '../../../../utils/estadoCompraUtils';
import { useDetalleClienteContext } from '../../../../context/DetalleClienteContext';
import clienteServices from '../../../../services/clienteServices';

const ResumenDeuda = () => {
    const { 
        deudas, 
        setDeudas, 
        keyDeudasSelecionadas, 
        setKeyDeudasSelecionadas, 
        metodosDePago, 
        idCliente,
        setVentas
     } = useDetalleClienteContext();
    const [montoTotalDeudas, setMontoTotalDeudas] = useState('')
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = React.useState("");
    const [deudasSeleccionadas, setDeudasSeleccionadas] = useState([])
    const [metodoPagoCompletado, setMetodoPagoCompletado] = useState(true)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)

    const cantidadParcialmenteCobrada = estadoCompraUtils.calcularCantidadEstadoPago(deudas, 'parcialmente_cobrada');
    let textoCantidadParcialmenteCobrada = '-';
    if (cantidadParcialmenteCobrada > 0) {
        textoCantidadParcialmenteCobrada = cantidadParcialmenteCobrada > 1 ? `${cantidadParcialmenteCobrada} deudas` : `${cantidadParcialmenteCobrada} deuda`;
    }

    const cantidadNoCobrada = estadoCompraUtils.calcularCantidadEstadoPago(deudas, 'no_cobrada');
    let textoCantidadNoCobrada = '-';
    if (cantidadNoCobrada > 0) {
        textoCantidadNoCobrada = cantidadNoCobrada > 1 ? `${cantidadNoCobrada} deudas` : `${cantidadNoCobrada} deuda`;
    }

    useEffect(() => {
        if(isOpen){
            setMetodoPagoSeleccionado([1]);
            setMetodoPagoCompletado(true);
        }
      }, [isOpen])

    useEffect(() => {
        const deuda = estadoCompraUtils.calcularTotalDeudaSeleccionados(deudasSeleccionadas);
        setMontoTotalDeudas(deuda);
    }, [deudasSeleccionadas])

    useEffect(() => {
        if (keyDeudasSelecionadas === "all") {
            setDeudasSeleccionadas([...deudas]);
        } else {
            const idsArray = [...keyDeudasSelecionadas].map(id => parseInt(id));
            const deudasFiltradas = deudas.filter(venta => idsArray.includes(venta.id));
            setDeudasSeleccionadas(deudasFiltradas);
        }
    }, [keyDeudasSelecionadas])

    const onSubmitSaldar = () => {
        if (metodoPagoSeleccionado !== "") {
            setMetodoPagoCompletado(true);
            fetchSaldarDeuda();
        } else {
            setMetodoPagoCompletado(false);
        }
    }

    const handleSelectionChange = (e) => {
        setMetodoPagoSeleccionado(e.target.value);
        setMetodoPagoCompletado(true);
    };
    
    const fetchSaldarDeuda = async () => {
        setIsLoading(true);
        try {
            const response = await clienteServices.saldarDeudaCliente(idCliente, deudasSeleccionadas, metodoPagoSeleccionado);
            setDeudas(response.deudas);
            setVentas(response.ventas)
            setKeyDeudasSelecionadas([]);
            onOpenChange();
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col'>
                                    <div className="mb-6">
                                        <p className='text-center mb-4' style={{ fontSize: 25, fontWeight: 'bold' }}>
                                            Saldar:  ${montoTotalDeudas}
                                        </p>

                                        <p className='text-center'>
                                            Está a punto de cancelar las deudas seleccionadas.
                                        </p>
                                        <p className='text-center mb-10' style={{ color: 'red' }}>
                                            Este paso no se puede deshacer
                                        </p>
                                    </div>
                                    <Select
                                        isRequired
                                        label="Método de pago"
                                        className="w-auto"
                                        size='sm'
                                        onChange={handleSelectionChange}
                                        defaultSelectedKeys={["1"]}
                                        isInvalid={!metodoPagoCompletado}
                                        errorMessage={!metodoPagoCompletado ? "Seleccione un método de pago" : ""}
                                    >
                                        {metodosDePago.map((metodo) => (
                                            <SelectItem key={metodo.id} value={metodo.id}>
                                                {metodo.nombre}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </ModalBody>
                            <ModalFooter className="mt-3">
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={onSubmitSaldar}>
                                    Saldar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="flex justify-between">
                <div className="flex">
                    <CardHeader className="pt-2 px-4 flex-col items-start w-auto">
                        <p className="text-tiny uppercase font-bold">Total</p>
                        <small className="text-default-500">${estadoCompraUtils.calcularTotalDeudaSeleccionados(deudas)}</small>
                    </CardHeader>
                    <Divider orientation="vertical" style={{ height: 'auto' }} />
                    <CardHeader className="pt-2 px-4 flex-col items-start w-auto">
                        <p className="text-tiny uppercase font-bold">Parcialmente Cobrada</p>
                        <small className="text-default-500">
                            {textoCantidadParcialmenteCobrada}
                        </small>
                    </CardHeader>
                    <Divider orientation="vertical" style={{ height: 'auto' }} />
                    <CardHeader className="pt-2 px-4 flex-col items-start w-auto">
                        <p className="text-tiny uppercase font-bold">No Cobrada</p>
                        <small className="text-default-500">
                            {textoCantidadNoCobrada}
                        </small>
                    </CardHeader>
                </div>
                <div className="flex">
                    <CardHeader className="pt-2 px-4 flex-col items-start w-auto">
                        {
                            montoTotalDeudas > 0
                                ?
                                <>
                                    <div className="flex gap-6" style={{ backgroundColor: '#d2e3fc', paddingRight: 12, paddingLeft: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 7 }} >
                                        <div>
                                            <p className="text-tiny uppercase font-bold" >Total Selección</p>
                                            <p style={{ color: '#ff0000', fontSize: 18 }}>
                                                ${montoTotalDeudas}
                                            </p>
                                        </div>
                                        <Button onPress={onOpen} className="bg-foreground text-background" style={{ cursor: 'pointer' }} >
                                            Cancelar Monto
                                        </Button>
                                    </div>
                                </>
                                : ''
                        }
                    </CardHeader>
                </div>
            </div>
        </>
    )
}

export default ResumenDeuda
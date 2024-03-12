import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import cajaServices from '../../../services/cajaServices';
import { formatearAMoneda } from '../../../utils/utils';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Accordion, AccordionItem } from "@nextui-org/react";
import { urls } from '../../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResumenDetallado from '../detalle/ResumenDetallado';
import metodoPagoServices from '../../../services/metodoPagoServices';
import ventaServices from '../../../services/ventaServices';

export default function MainCajaActual() {
    const [montoTotal, setMontoTotal] = useState(0)
    const [sesionActual, setSesionActual] = useState(null)
    const [movimientosAdicion, setMovimientosAdicion] = useState(0)
    const [movimientosRetiro, setmMovimientosRetiro] = useState(0)
    const [metodos, setMetodos] = useState(null)
    const [ventas, setVentas] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        fetchCajaActual()
    }, []);

    const fetchCajaActual = async () => {
        try {
            const response = await cajaServices.traerCajaActual();
            setMontoTotal(response.total);
            setSesionActual(response.ultimaSesion);
            setMovimientosAdicion(response.movimientosAdicion);
            setmMovimientosRetiro(response.movimientosRetiro);

            setVentas(response.ultimaSesion.ventas);

            // Fetch de métodos de pago
            const metodoPagoResponse = await metodoPagoServices.traerLista();
            setMetodos(metodoPagoResponse);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    const onPressSubmit = () => {
        fetchService();
    }

    const fetchService = async () => {
        setIsLoading(true);
        const id = toast.loading("Procesando datos, aguarde...", {
            isLoading: true,
            position: "bottom-right",
            closeOnClick: true,
            theme: "colored",
        })
        try {
            const response = await cajaServices.cerrarCaja();
            if (response.status === 200) {
                toast.update(id, {
                    isLoading: false,
                    autoClose: 9000,
                    render: "Proceso finalizado correctamente!",
                    type: "success",
                });
                window.location.href = `${urls.caja.apertura}`
            } else {
                setMessage(data.message);
                toast.update(id, {
                    isLoading: false,
                    autoClose: 3000,
                    render: "Error: " + data.message,
                    type: "error",
                });
            }
        } catch (error) {
            toast.update(id, {
                isLoading: false,
                autoClose: 3000,
                render: "Error inesperado, contacte con soporte",
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    function irPaginaHistorial() {
        window.location.href = `${urls.caja.historial}`
    }

    function irPaginaIngreso() {
        window.location.href = `${urls.caja.ingreso}`
    }

    function irPaginaRetiro() {
        window.location.href = `${urls.caja.egreso}`
    }

    return (
        <>
            {
                isLoading
                    ? "Cargando..."
                    :
                    <>
                        <div className="py-12">
                            <div className="flex justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-10">
                                        <div className="flex items-center">
                                            <div>
                                                <p className="text-4xl">${formatearAMoneda(montoTotal)}</p>
                                                <p>Efectivo de apertura: ${sesionActual?.monto_inicial}</p>
                                            </div>
                                            <div className="flex ml-4 gap-4">
                                                <Button onClick={() => irPaginaIngreso()}>Ingresar</Button>
                                                <Button onClick={() => irPaginaRetiro()}>Retirar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-baseline">
                                    <div className="dark:text-gray-500">

                                        <Button onPress={onOpen}>Cerrar Caja</Button>
                                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">Confirmar Cerrar Caja</ModalHeader>
                                                        <ModalBody>
                                                            <p>¿Estás seguro de que deseas cerrar la caja?</p>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="danger" variant="light" onPress={onClose}>
                                                                Cancelar
                                                            </Button>
                                                            <Button color="primary" onPress={onPressSubmit}>
                                                                Cerrar Caja
                                                            </Button>
                                                        </ModalFooter>
                                                    </>
                                                )}
                                            </ModalContent>
                                        </Modal>
                                    </div>

                                    <div className="dark:text-gray-500">
                                        <Button onClick={() => irPaginaHistorial()}>Historial</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-4 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                                <div className='ml-2 mb-4'>
                                    <ResumenDetallado
                                        ventas={ventas}
                                        metodos={metodos}
                                        movimientosAdicion={movimientosAdicion}
                                        movimientosRetiro={movimientosRetiro}
                                        sesionActual={sesionActual}
                                    />
                                </div>

                            </div>
                            <ToastContainer />

                        </div>
                    </>
            }
        </>
    )
}

if (document.getElementById('MainCajaActual')) {
    const domNode = document.getElementById('MainCajaActual');
    const root = createRoot(domNode);
    root.render(<MainCajaActual />);
}
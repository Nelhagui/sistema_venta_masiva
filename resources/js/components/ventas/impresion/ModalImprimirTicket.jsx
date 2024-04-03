import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import ventaServices from '../../../services/ventaServices';
import { PrintIcon } from '../../icons/PrintIcon';
import { endpoints } from '../../../config/config';
import { capitalizeToLowerCase, formatearAMoneda } from '../../../utils/utils';
import fechaUtils from '../../../utils/fechaUtils';

export default function ModalImprimirTicket({ idVenta, label = null, propStyle = '' }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [venta, setVenta] = useState(null);
    const [comercio, setComercio] = useState(null);

    const fetchVenta = async () => {
        try {
            const response = await ventaServices.detalleVenta(idVenta);
            setVenta(response.venta);
            setComercio(response.comercio);
        } catch (error) {
            console.log(error)
        }
    }

    const handlePrint = () => {
        if (venta === null) {
            // Si venta aún no tiene un valor asignado, no hacemos nada
            return;
        }

        const style = `
            body {
                margin: 0; /* Eliminar márgenes */
                padding: 5px; /* Eliminar relleno */
                font-family: Arial, sans-serif; /* Fuente comúnmente utilizada en tickets */
            }
            h1 {
                font-size: 12px; /* Tamaño de fuente para el título */
            }
            p {
                font-size: 10px;
            }
            table {
                border-collapse: collapse;
            }
            td {
                padding: 5px;
            }
            td p {
                margin-block: 5px
            }
            .text-center {
                text-align: center;
            }
            .precio {
                width: 25%; /* El precio ocupa el 20% del ancho de la tabla */
                height: 100%;
                align-items: end;
                justify-content: end;
            }
            .producto {
                width: 75%; /* El nombre del producto ocupa el 80% del ancho de la tabla */
            }
            .fecha {
                display: flex;
                justify-content: center;
                gap: 5px;
                
            }
            .border-dotted {
                border-top: 1px dotted #000;
                border-bottom: 1px dotted #000;
            }
            .text-end {
                text-align: end;
            }
            .me-5 {
                margin-right: 5px
            }
        `;

        const detallesVentaHTML = venta?.detalles.map(detalle => `
            <tr key="${detalle.id}">
                <td class="producto">
                    <p>${detalle.cantidad} x $${formatearAMoneda(detalle.precio_unitario)}</p>
                    <p>${capitalizeToLowerCase(detalle.nombre_producto)}</p>
                </td>
                <td class="precio">
                    <p>$${formatearAMoneda(detalle.precio_unitario * detalle.cantidad)}</p>
                </td>
            </tr>
        `).join('');

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Escribir el contenido en el iframe
        const iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title></title>
                    <style>${style}</style>
                </head>
                <body>
                    <div class="text-center">
                        <p>X</p>
                        <p>DOCUMENTO NO FISCAL</p>
                        <h1>${comercio?.nombre}</h1>
                        <div class="fecha border-dotted">
                            <p>Fecha: ${fechaUtils.convertirFormatoFecha(venta?.created_at)}</p>
                            <p>Hora: ${fechaUtils.convertirFormatoHora(venta?.created_at)}</p>
                        </div>
                    </div>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        ${detallesVentaHTML}
                    </table>
                    <div class="border-dotted">
                        <p class="text-end me-5">TOTAL: $${formatearAMoneda(venta?.monto_total_venta)}</p>
                    </div>
                    <p class="text-center">¡GRACIAS POR SU COMPRA!</p>
                </body>
            </html>
        `);
        iframeDocument.close();

        // Llamar al método print en el iframe
        iframe.contentWindow.print();

        onOpenChange()
    };


    useEffect(() => {
        if (isOpen) {
            fetchVenta();
        }
    }, [isOpen]);

    return (
        <>
            <div onClick={onOpen} style={{ cursor: 'pointer' }}>
                {
                    label ?
                        <div className={propStyle}>
                            <PrintIcon />
                            <p>{label}</p>
                        </div>
                        :
                        <PrintIcon />
                }
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Imprimir Ticket
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Está seguro que quiere Imprimir el ticket de la venta seleccionada?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    isDisabled={isLoading}
                                    color="primary"
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    isDisabled={isLoading}
                                    color="danger"
                                    onPress={isLoading ? null : handlePrint}
                                >
                                    {
                                        isLoading ?
                                            <>
                                                <Spinner color='default' size='sm' /> Procesando...
                                            </>
                                            : "Imprimir Ticket"
                                    }
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
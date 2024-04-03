import React, { useEffect } from 'react'
import ListProductos from './ListProductos'
import { useLectorContext } from '../../context/LectorContext'
import ModalImprimirTicket from '../ventas/impresion/ModalImprimirTicket'
import ventaServices from '../../services/ventaServices'

const ContainerLector = ({ productos, metodosDePago, clientes }) => {
    const {
        idUltimaVenta,
        setIdUltimaVenta
    } = useLectorContext();

    const fetchUltimaVenta = async () => {
        try {
            const response = await ventaServices.ultimaVenta();
            if (response.ok) {
                const data = await response.json();
                setIdUltimaVenta(data.id_ultima_venta); // O el nombre de campo adecuado según la estructura del JSON
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
        }
    };


    useEffect(() => {
        fetchUltimaVenta()
    }, []);

    return (
        <>

            <ListProductos productos={productos} metodosDePago={metodosDePago} clientes={clientes} />
            <div style={{ position: 'absolute', bottom: 50, cursor: 'pointer' }}>
                <div className='flex items-center gap-2 hover:underline'>
                    {
                        idUltimaVenta
                            ? <ModalImprimirTicket idVenta={idUltimaVenta} label="Última venta" propStyle="flex gap-2 items-center" />
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default ContainerLector
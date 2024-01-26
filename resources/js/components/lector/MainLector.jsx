import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ListProductos from './ListProductos';
import { LectorContextProvider } from '../../context/LectorContext';
import metodoPagoServices from '../../services/metodoPagoServices';
import clienteServices from '../../services/clienteServices';
import productoServices from '../../services/productoServices';

export default function MainLector() {
    const [productos, setProductos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [metodosDePago, setMetodosDePago] = useState([])
    const [clientes, setClientes] = useState([])

    const fetchMetodosDePago = async () => {
        setIsLoading(true);
        try {
            const response = await metodoPagoServices.traerLista(); // Agrega paréntesis para invocar la función
            setMetodosDePago(response); // Establece el estado con los datos de la respuesta
        } catch (error) {
            // Maneja el error de alguna manera, por ejemplo, mostrando un mensaje de error al usuario
            console.error('Error al obtener la lista de métodos de pago:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchListaClientes = async () => {
        setIsLoading(true);
        try {
            const response = await clienteServices.traerLista(); // Agrega paréntesis para invocar la función
            setClientes(response); // Establece el estado con los datos de la respuesta
        } catch (error) {
            // Maneja el error de alguna manera, por ejemplo, mostrando un mensaje de error al usuario
            console.error('Error al obtener la lista de métodos de pago:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchListaProductos = async () => {
        setIsLoading(true);
        try {
            const response = await productoServices.traerLista();
            setProductos(response)
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchMetodosDePago()
        fetchListaClientes()
        fetchListaProductos()
    }, []);

    return (
        productos.length > 0
            ? <ListProductos productos={productos} metodosDePago={metodosDePago} clientes={clientes}></ListProductos>
            : null
    )
}

if (document.getElementById('mainLector')) {
    const domNode = document.getElementById('mainLector');
    const root = createRoot(domNode);
    root.render(
        <LectorContextProvider>
            <MainLector />
        </LectorContextProvider>
    );
}
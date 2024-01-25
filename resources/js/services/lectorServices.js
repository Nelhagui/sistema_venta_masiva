import { endpoints } from "../config/config";
const lectorServices = {
    crearVenta: async (productosSeleccionados, clienteSeleccionado, estadoDelPago, metodoPagoSeleccionado, montoAbonado) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.ventas.crear;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ 
                productos: productosSeleccionados, 
                cliente: clienteSeleccionado,
                estadoPago: estadoDelPago,
                metodoPago: metodoPagoSeleccionado,
                montoAbonado: Number(montoAbonado)
            })
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
};

export default lectorServices;

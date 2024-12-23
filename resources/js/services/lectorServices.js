import { endpoints } from "../config/config";
const lectorServices = {
    crearVenta: async (productosSeleccionados, clienteSeleccionado, estadoDelPago, metodoPagoSeleccionado, montoAbonado, aumento = null, descuento = null, tipoAumento = null, tipoDescuento = null) => {
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
                montoAbonado: Number(montoAbonado),
                aumento: Number(aumento),
                descuento: Number(descuento),
                TipoAumento: tipoAumento,
                tipoDescuento: tipoDescuento
            })
        };

        try {
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return {
                ok: true,
                data: responseData
            };
        } catch (error) {
            return {
                ok: false,
                error: error.message
            };
        }
    }
};

export default lectorServices;

import { endpoints } from "../config/config";
const productoServices = {
    traerLista: async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.productos.lista;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            }
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
    },
    detalleCliente: async (cliente_id) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = `${endpoints.clientes.detalle}/${cliente_id}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            }
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
    },
    cargarCompra: async (productosSeleccionados, datosCompra, nuevosProductos) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.productos.stockPrecio;

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
                datosCompra: datosCompra,
                nuevosProductos: nuevosProductos,
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

export default productoServices;
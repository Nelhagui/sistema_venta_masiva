import { endpoints } from "../config/config";
const ventaServices = {
    traerLista: async (query = null) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        
        let url = `${endpoints.ventas.lista}`;
        if(query)
            url = `${endpoints.ventas.lista}?fecha=${query}`;

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
    detalleVenta: async (venta_id) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = `${endpoints.ventas.detalle}/${venta_id}`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            },
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
    traerListaSegunSesionCaja: async (sesionCajaId = null) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        
        let url = `${endpoints.ventas.lista}`;
        if(sesionCajaId)
            url = `${endpoints.ventas.lista}/${sesionCajaId}`;

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
    anularVenta: async (data) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.ventas.anular;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ 
                id: data
            })
        };

        try {
            const response = await fetch(url, requestOptions);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
    ultimaVenta: async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.ventas.ultimaVenta;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            }
        };
        try {
            const response = await fetch(url, requestOptions);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

};

export default ventaServices;

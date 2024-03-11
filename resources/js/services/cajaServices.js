import { endpoints } from "../config/config";
const cajaServices = {
    traerCajaActual: async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let url = endpoints.caja.cajaActual;
        
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
    cerrarCaja: async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.caja.cerrarCaja;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default cajaServices;

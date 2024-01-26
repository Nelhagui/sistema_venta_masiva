import { endpoints } from "../config/config";
const proveedorServices = {
    traerLista: async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.proveedores.lista;

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
};

export default proveedorServices;
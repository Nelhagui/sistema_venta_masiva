import { endpoints } from "../config/config";
const inversionesServices = {
    crearInversion: async (data) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.inversiones.crear;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicacion/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(data)
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
export default inversionesServices;
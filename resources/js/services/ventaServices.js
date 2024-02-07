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
    
};

export default ventaServices;

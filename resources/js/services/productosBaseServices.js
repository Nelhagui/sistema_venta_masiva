import { endpoints } from "../config/config";
const productosBaseServices = {
    traerCoincidenciasConCodigoBarra: async (codigos) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = endpoints.productosBase.busqueda;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                codigos_barras: codigos,
            })
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

export default productosBaseServices;
export const BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const endpoints = {
    ventas: {
        crear: `${API_BASE_URL}/ventas/crear`,
    },
    clientes: {
        lista: `${API_BASE_URL}/clientes`,
    },
};

export const urls = {
    ventas: {
        lista: `${BASE_URL}/ventas`,
    },
    clientes: {
        lista: `${BASE_URL}/clientes`,
        detalle: `${BASE_URL}/clientes/detalle`,
    },
};


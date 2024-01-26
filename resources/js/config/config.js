export const BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const endpoints = {
    ventas: {
        crear: `${API_BASE_URL}/ventas/crear`,
    },
    clientes: {
        lista: `${API_BASE_URL}/clientes`,
        detalle: `${API_BASE_URL}/clientes/detalle`,
        saldarDeudas: `${API_BASE_URL}/clientes/deudas/saldar`,
    },
    productos: {
        lista: `${API_BASE_URL}/productos`,
        crear: `${API_BASE_URL}/productos`,
    },
    proveedores: {
        lista: `${API_BASE_URL}/proveedores`,
    },
    inversores: {
        lista: `${API_BASE_URL}/inversores`,
    },
    metodosDePago: {
        lista: `${API_BASE_URL}/metodos-pago`,
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
    productos: {
        lista: `${BASE_URL}/productos`,
        crear: `${BASE_URL}/productos/agregar`,
        editar: `${BASE_URL}/productos/editar`,
        importar: `${BASE_URL}/productos/importar`,
        stockPrecio: `${BASE_URL}/productos/stock-precio`,
    }
};


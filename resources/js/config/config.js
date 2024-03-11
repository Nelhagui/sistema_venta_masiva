export const BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'http://127.0.0.1:8000/api';
// export const BASE_URL = 'https://rapidoventas.com.ar';
// export const API_BASE_URL = 'https://rapidoventas.com.ar/api';
// export const BASE_URL = 'https://test.rapidoventas.com.ar';
// export const API_BASE_URL = 'https://test.rapidoventas.com.ar/api';

export const endpoints = {
    ventas: {
        lista: `${API_BASE_URL}/ventas`,
        crear: `${API_BASE_URL}/ventas/crear`,
        anular: `${API_BASE_URL}/ventas/anular`,
    },
    caja: {
        cajaActual: `${API_BASE_URL}/caja`,
        cerrarCaja: `${API_BASE_URL}/caja/cierre-caja`
    },
    clientes: {
        lista: `${API_BASE_URL}/clientes`,
        crear: `${API_BASE_URL}/clientes/crear`,
        detalle: `${API_BASE_URL}/clientes/detalle`,
        saldarDeudas: `${API_BASE_URL}/clientes/deudas/saldar`,
    },
    productos: {
        lista: `${API_BASE_URL}/productos`,
        crear: `${API_BASE_URL}/productos`,
        subirExcel: `${API_BASE_URL}/productos/subir/archivo`,
        stockPrecio: `${API_BASE_URL}/productos/stock-precio`
    },
    productosBase: {
        busqueda: `${API_BASE_URL}/productos-base/busqueda-titulos`,
    },
    proveedores: {
        lista: `${API_BASE_URL}/proveedores`,
        crear: `${API_BASE_URL}/proveedores/crear`,
    },
    inversores: {
        lista: `${API_BASE_URL}/inversores`,
        detalle: `${API_BASE_URL}/inversores/detalle`,
        crear: `${API_BASE_URL}/inversores/crear`,
    },
    inversiones: {
        lista: `${API_BASE_URL}/inversiones`,
        detalle: `${API_BASE_URL}/inversiones/detalle`,
        crear: `${API_BASE_URL}/inversiones/crear`,
    },
    pagos: {
        crear: `${API_BASE_URL}/inversiones/pagos/crear`
    },
    metodosDePago: {
        lista: `${API_BASE_URL}/metodos-pago`,
        crear: `${API_BASE_URL}/metodos-pago`,
        eliminar:  `${API_BASE_URL}/metodos-pago/eliminar`
    },

};

export const urls = {
    lector: {
        ver: `${BASE_URL}/lector`
    },
    caja: {
        apertura: `${BASE_URL}/apertura-caja`,
        detalleCaja: `${BASE_URL}/caja-detalle`,
        historial: `${BASE_URL}/cajas`,
        ingreso: `${BASE_URL}/caja/cargar-ingreso`,
        egreso: `${BASE_URL}/caja/cargar-egreso`
    },
    ventas: {
        lista: `${BASE_URL}/ventas`,
        ver: `${BASE_URL}/ventas/ver`,
    },
    clientes: {
        lista: `${BASE_URL}/clientes`,
        editar: `${BASE_URL}/clientes/editar`,
        detalle: `${BASE_URL}/clientes/detalle`,
    },
    proveedores: {
        lista: `${BASE_URL}/proveedores`,
        editar: `${BASE_URL}/proveedores/editar`,
        detalle: `${BASE_URL}/proveedores/detalle`,
    },
    inversores: {
        detalle: `${BASE_URL}/inversores/detalle`,
    },
    inversiones: {
        detalle: `${BASE_URL}/inversiones/detalle`,
    },
    metodosDePago: {
        editar: `${BASE_URL}/metodos/editar`
    },
    productos: {
        lista: `${BASE_URL}/productos`,
        crear: `${BASE_URL}/productos/agregar`,
        editar: `${BASE_URL}/productos/editar`,
        importar: `${BASE_URL}/productos/importar`,
        stockPrecio: `${BASE_URL}/productos/stock-precio`,
        importarArchivo: `${BASE_URL}/productos/importar`
    },
    descargarExcelEjemplo: `${BASE_URL}/public/files/rapido-ventas-excel-ejemplo.xlsx`
};


const estadoCompraUtils = {
    getTextoEstadoCompra: (estado) => {
        switch (estado) {
            case 'parcialmente_cobrada':
                return 'Parcialmente Cobrada';
            case 'cobrada':
                return 'Cobrada';
            case 'no_cobrada':
                return 'No Cobrada';
            default:
                return 'Desconocida';
        }
    },
    calcularMontoTotalPagos: (pagos) => {
        let total = 0;
        pagos.forEach(pago => {
            total += Number(pago.monto_pagado);
        });
        return total;
    },
    calcularCantidadEstadoPago: (deudas, tipo) => {
        let total = 0;
        deudas.forEach(deuda => {
            if (deuda.estado_pago === tipo)
                total++;
        });
        return total;
    },
    calcularTotalDeudaSeleccionados: (deudas) => {
        let totalDeuda = 0;
        deudas.forEach(deuda => {
            const montoVenta = Number(deuda.monto_total_venta);
            const totalPagos = deuda.pagos.reduce((total, pago) => total + Number(pago.monto_pagado), 0);
            const saldoPendiente = montoVenta - totalPagos;
            totalDeuda += saldoPendiente;
        });
        return totalDeuda;
    }
};

export default estadoCompraUtils;
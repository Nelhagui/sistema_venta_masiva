export function toCamelCase(str) {
    return str.replace(/[-_](.)/g, (match, group1) => {
        return group1.toUpperCase();
    });
}

export function formatearAMoneda(numero) {
    // Convertir el número a un valor numérico si es una cadena
    const numeroConvertido = typeof numero === 'string' ? parseFloat(numero) : numero;

    // Separar la parte entera de la parte decimal
    const [parteEntera, parteDecimal] = numeroConvertido.toFixed(2).split('.');

    // Agregar el separador de miles
    const parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Formatear el número con coma como separador decimal
    return `${parteEnteraFormateada},${parteDecimal}`;
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function capitalizeToUpperCase(str) {
    return str.toUpperCase();
}

export function capitalizeToLowerCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function exedeLimiteDecimales(numero, limite = 3) {
    const numeroComoString = numero.toString();
    const indicePunto = numeroComoString.indexOf('.');
    let cantidadDecimales = 0;

    if (indicePunto !== -1) {
        cantidadDecimales = numeroComoString.length - indicePunto - 1;
    }

    return cantidadDecimales > limite;
}
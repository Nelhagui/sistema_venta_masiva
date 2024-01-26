const fechaUtils = {
    convertirFormatoFechaHora: (fecha) => {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth() + 1;
        const anio = fechaObj.getFullYear();
        const horas = fechaObj.getHours();
        const minutos = fechaObj.getMinutes();

        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const mesFormateado = mes < 10 ? `0${mes}` : mes;
        const horasFormateadas = horas < 10 ? `0${horas}` : horas;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

        return `${diaFormateado}/${mesFormateado}/${anio} ${horasFormateadas}:${minutosFormateados}`;
    },
    convertirFormatoFecha: (fecha) => {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth() + 1;
        const anio = fechaObj.getFullYear();

        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const mesFormateado = mes < 10 ? `0${mes}` : mes;

        return `${diaFormateado}/${mesFormateado}/${anio}`;
    },
    convertirFormatoHora: (fecha) => {
        const fechaObj = new Date(fecha);
        const horas = fechaObj.getHours();
        const minutos = fechaObj.getMinutes();
        const horasFormateadas = horas < 10 ? `0${horas}` : horas;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

        return `${horasFormateadas}:${minutosFormateados}`;
    }
};

export default fechaUtils;

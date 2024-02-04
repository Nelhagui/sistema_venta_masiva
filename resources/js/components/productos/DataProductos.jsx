import React from "react";

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "TITULO", uid: "titulo", sortable: true },
    { name: "PRECIO COSTO", uid: "precio_costo", sortable: true },
    { name: "PRECIO VENTA", uid: "precio_venta" },
    { name: "STOCK", uid: "stock_actual" },
    { name: "ACCIONES", uid: "acciones" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];


const DataProductos = () => {
    return <div>{/* Aquí puedes usar las constantes columns, statusOptions y users */}</div>;
};

export { DataProductos as default, columns, statusOptions };

import React, { createContext, useState } from 'react';

const LectorContext = createContext();

const LectorProvider = ({ children }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([])
  const [total, setTotal] = useState(0);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
    setTotal(total + producto.precio);
  };

  const eliminarProducto = (id) => {
    const productoEliminado = productos.find((producto) => producto.id === id);

    if (productoEliminado) {
      const nuevosProductos = productos.filter((producto) => producto.id !== id);
      setProductos(nuevosProductos);
      setTotal(total - productoEliminado.precio);
    }
  };

  const limpiarCompra = () => {
    setProductos([]);
    setTotal(0);
  };

  return (
    <LectorContext.Provider
      value={{
        productos,
        total,
        agregarProducto,
        eliminarProducto,
        limpiarCompra,
      }}
    >
      {children}
    </LectorContext.Provider>
  );
};

export { LectorContext, LectorProvider };

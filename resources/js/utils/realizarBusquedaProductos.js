const realizarBusquedaProductos = (textoBusqueda, productos, setResultadoBusqueda) => {
    const MAX_PRODUCTOS = 30;
    if (textoBusqueda === '') {
        setResultadoBusqueda([]);
    } else {
        if (/^\d+$/.test(textoBusqueda)) {
            const productoEncontrado = productos.find((producto) => Number(producto.codigo_barra) === Number(textoBusqueda));
            console.log('es codigo de barra');
        } else {
            const palabrasBusqueda = textoBusqueda.trim().toLowerCase().split(' ').filter(Boolean); // filter(Boolean) elimina espacios en blanco
            const productosCoincidentes = productos.map(producto => {
                const tituloLowerCase = producto.titulo.toLowerCase();
                let coincidenciasCount = 0;
                palabrasBusqueda.forEach(palabra => {
                    if (tituloLowerCase.includes(palabra.trim())) { // trim() elimina espacios en blanco al principio y al final
                        coincidenciasCount++;
                    }
                });
                return {
                    producto,
                    coincidenciasCount
                };
            }).filter(item => item.coincidenciasCount > 0)
                .sort((a, b) => b.coincidenciasCount - a.coincidenciasCount)
                .map(item => item.producto)
                .slice(0, MAX_PRODUCTOS);
            setResultadoBusqueda(productosCoincidentes);
        }
    }
};

export default realizarBusquedaProductos;

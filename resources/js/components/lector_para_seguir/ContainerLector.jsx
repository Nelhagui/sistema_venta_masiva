import React from 'react'
import BuscadorProductos from './buscador/BuscadorProductos'
// import ProductosSeleccionados from './productos_seleccionados/ProductosSeleccionados'
// import ResumenTotales from './resumen_totales/ResumenTotales';
// import ConfigAumentoDescuento from './opciones_aumentos_descuentos/ConfigAumentoDescuento';
// import Vuelto from './vuelto/Vuelto';
// import MetodoDePago from './metodo_de_pago/MetodoDePago'



const ContainerLector = () => {
    return (
        <>
            <div className='absolute right-0 flex flex-col gap-y-6'>
                {/* <ConfigAumentoDescuento />
                <Vuelto /> */}
            </div>
            <div className='flex flex-col w-2/4 gap-y-8'>
                <div className='flex justify-end gap-x-4'>
                    {/* <ResumenTotales /> */}
                </div>
                <div >
                    <BuscadorProductos />
                </div>
                <div>
                    {/* <ProductosSeleccionados /> */}
                </div>
            </div>
            <div className='absolute bottom-0 flex flex-col gap-y-6 w-full'>
                {/* <MetodoDePago /> */}
            </div>
        </>
    )
}

export default ContainerLector
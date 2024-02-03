import { createRoot } from 'react-dom/client';
import { Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, input } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import productoServices from '../../../services/productoServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainCrearProductos() {

    const [filas, setFilas] = useState([]);
    const [valoresInputs, setValoresInputs] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [errores, setErrores] = useState([]);

    // Crear la fila por defecto
    useEffect(() => {
        agregarFila();
    }, []); // Se ejecuta solo una vez al montar el componente

   
    const handleConfirmCompra = () => {
        handleSubmit();
    };


    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await productoServices.crear();
            const data = await response.json();
            if (response.status !== 200) {
                if (data?.errors?.length > 0) {
                    let objetoResultado = {};
                    data.errors.forEach(error => {
                        objetoResultado[`${error.key}-${error.campo}`] = error.error;
                    });
                    setErrores(objetoResultado);
                    console.log('bucleando')
                    console.log(errores)
                } else {
                    console.log('error inesperado');
                }
            } else {
                toast.success('Productos cargados exitosamente', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setErrores([]);
            }
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };


    const agregarFila = () => {
        setFilas([...filas, {
            columnaTitulo: 'titulo',
            columnaCodigoBarra: 'codigo_barra',
            columnaPrecioCosto: 'precio_costo',
            columnaPrecioVenta: 'precio_venta',
            columnaStock: 'stock'
        }]);
        setValoresInputs([...valoresInputs, {
            columnaTitulo: '',
            columnaCodigoBarra: '',
            columnaPrecioCosto: '',
            columnaPrecioVenta: '',
            columnaStock: ''
        }]);
    };

    const eliminarFila = (index) => {
        const nuevasFilas = [...filas];
        nuevasFilas.splice(index, 1);
        setFilas(nuevasFilas);

        const nuevosValoresInputs = [...valoresInputs];
        nuevosValoresInputs.splice(index, 1);
        setValoresInputs(nuevosValoresInputs);
    };

    const handleInputChange = (e, index, columna) => {
        const nuevosValoresInputs = [...valoresInputs];
        nuevosValoresInputs[index][columna] = e.target.value;
        console.log(e.target.value);
        setValoresInputs(nuevosValoresInputs);
    };

    return (
        <>
            <div className='d-flex' style={{ textAlign: 'end', marginBlock: '0 10px' }}>
                <Button color="danger" onClick={() => { handleConfirmCompra() }}>Cargar Compra</Button>
            </div>
            <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full'>
                <table className='min-w-full h-auto table-auto w-full'>
                    <thead className='[&>tr]:first:rounded-lg'>
                        <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                            <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>TÍTULO</th>
                            <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>CÓDIGO BARRA</th>
                            <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>PRECIO COSTO</th>
                            <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>PRECIO VENTA</th>
                            <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>STOCK</th>
                            <th className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((fila, index) => (
                            <tr key={index} className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        type="text"
                                        className='input-text'
                                        value={valoresInputs[index].columnaTitulo}
                                        onChange={(e) => handleInputChange(e, index, 'columnaTitulo')}
                                    />
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        type="number"
                                        className='input-text'
                                        value={valoresInputs[index].columnaCodigoBarra}
                                        onChange={(e) => handleInputChange(e, index, 'columnaCodigoBarra')}
                                    />
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        type="number"
                                        className='input-text'
                                        value={valoresInputs[index].columnaPrecioCosto}
                                        onChange={(e) => handleInputChange(e, index, 'columnaPrecioCosto')}
                                    />
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        type="number"
                                        className='input-text'
                                        value={valoresInputs[index].columnaPrecioVenta}
                                        onChange={(e) => handleInputChange(e, index, 'columnaPrecioVenta')}
                                    />
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        type="number"
                                        className='input-text'
                                        value={valoresInputs[index].columnaStock}
                                        onChange={(e) => handleInputChange(e, index, 'columnaStock')}
                                    />
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <button onClick={() => eliminarFila(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex text-center mt-4'>
                <Button variant="ghost" onClick={() => agregarFila()}>Agregar Nuevo Producto</Button>
            </div>
            <ToastContainer />
        </>
    )
}

if (document.getElementById('mainCrearProductos')) {
    const domNode = document.getElementById('mainCrearProductos');
    const root = createRoot(domNode);
    root.render(<MainCrearProductos />);
}
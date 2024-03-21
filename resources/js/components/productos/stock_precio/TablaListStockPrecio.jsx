import React, { useState, useEffect, useRef, useCallback } from 'react'
import { capitalizeFirstLetterOfEachWord } from '../../../utils/capitalizeFirstLetterOfEachWord';
import { debounce } from '../../../utils/debounce';
import { Input, Switch, Select, SelectItem, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Divider } from "@nextui-org/react";
import { SearchIcon } from '../../icons/SearchIcon';
import productoServices from '../../../services/productoServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SaveIcon } from '../../icons/SaveIcon';



const TablaListStockPrecio = ({ productos }) => {
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const productosInicialesRef = useRef([]);

    const [keyCounter, setKeyCounter] = useState(0);
    const [filas, setFilas] = useState([]);
    const [valoresInputs, setValoresInputs] = useState([]);

    useEffect(() => {
        productosInicialesRef.current = productosIniciales;
    }, [productosIniciales]);

    const [isLoading, setIsLoading] = useState(false)
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [errores, setErrores] = useState([])
    const selectedItemRef = useRef(null);
    const listContainerRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (inputRef.current) {
            focusInput();
        }
    }, []);


    const focusInput = () => inputRef.current.focus();

    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.select(); // Seleccionar todo el contenido del input
        }
    };

    const reset = () => {
        focusInput();
        setObjetosBuscados([]);
        setInputText('')
    }

    // BUSCADOR
    const handleInputSearchChange = (e) => {
        setIsLoading(true)
        const value = e.target.value;
        setInputText(value);
        debouncedSearchRef.current(value);
    }


    useEffect(() => {
        // Enfoque automático en el elemento seleccionado
        if (selectedItem !== null && selectedItemRef.current) {
            const listContainer = listContainerRef.current;
            const selectedItemElement = selectedItemRef.current;

            const containerTop = listContainer.offsetTop;
            const itemTop = selectedItemElement.offsetTop;
            // Calcular el desplazamiento necesario para que el elemento seleccionado esté centrado en el contenedor
            const scrollOffset = itemTop - containerTop - (listContainer.clientHeight - selectedItemElement.clientHeight) / 2;

            // Establecer el desplazamiento
            listContainer.scrollTop = scrollOffset;
        }
    }, [selectedItem]);



    const realizarBusqueda = (textoBusqueda) => {
        const productosActuales = productosInicialesRef.current;
        const MAX_PRODUCTOS = 30;
        if (textoBusqueda === '') {
            setObjetosBuscados([]);
        } else {
            if (/^\d+$/.test(textoBusqueda)) {
                const productoEncontrado = productosActuales.find((producto) => Number(producto.codigo_barra) === Number(textoBusqueda));
                if (productoEncontrado) {
                    agregarFilaConProducto(productoEncontrado)
                } else {
                    setObjetosBuscados([]);
                    handleInputFocus();
                }
            } else {
                const productosCoincidentes = productosActuales
                    .filter((producto) => producto.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()))
                    .slice(0, MAX_PRODUCTOS);
                setObjetosBuscados(productosCoincidentes);
            }
        }
        setIsLoading(false)
    }

    const debouncedSearchRef = useRef(debounce((textoBusqueda) => realizarBusqueda(textoBusqueda), 200));

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedItem((prevItem) => {
                const newItem = prevItem > 0 ? prevItem - 1 : 0;
                return newItem;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedItem((prevItem) => {
                const newItem = prevItem !== null ? (prevItem < objetosBuscados.length - 1 ? prevItem + 1 : prevItem) : 0;
                return newItem;
            });
        } else if (e.key === 'Enter' && objetosBuscados[selectedItem]) {
            agregarFilaConProducto(objetosBuscados[selectedItem]);
        } else if (e.key === 'F12' && productosSeleccionados.length > 0) {

        }
    };



    const handleConfirmCompra = () => {
        handleSubmit();
    };


    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const id = toast.loading("Procesando datos, aguarde...", {
                isLoading: true,
                position: "bottom-right",
                closeOnClick: true,
                theme: "colored",
            })

            const response = await productoServices.stockPrecio(valoresInputs);
            const data = await response.json();

            if (response.status !== 200) {
                if (data?.errors?.length > 0) {
                    let objetoResultado = {};
                    data.errors.forEach(error => {
                        objetoResultado[`${error.key}-${error.campo}`] = error.error;
                    });
                    setErrores(objetoResultado);
                } else {
                    toast.update(id, {
                        isLoading: false,
                        autoClose: true,
                        render: "Error inesperado, contacte con soporte. Error A5H",
                        type: "error",
                    });
                }
                toast.update(id, {
                    isLoading: false,
                    autoClose: true,
                    render: "Proceso incompleto",
                    type: "error",
                });
            } else {
                toast.update(id, {
                    isLoading: false,
                    render: "Proceso finalizado correctamente!",
                    type: "success",
                });
                setProductosSeleccionados([]);
            }
        } catch (error) {
            // Maneja el error si la creación de la compra falla
        } finally {
            setIsLoading(false);
        }
    };


    const generarIdUnico = (() => {
        let contador = 0;
        return () => {
            const fechaActual = new Date().getTime();
            return `${fechaActual}-${contador++}`;
        };
    })();

    const agregarFilaConProducto = (producto) => {
        // Verificar si el producto ya existe en las filas
        const productoExistenteIndex = valoresInputs.findIndex(valor => valor.key === producto.id);
        if (productoExistenteIndex !== -1) {
            // Si el producto ya existe, aumentar la cantidad
            const nuevosValores = [...valoresInputs];
            nuevosValores[productoExistenteIndex].stock_actual++;
            setFilas(nuevosValores);
        } else {
            // Si el producto no existe, agregar una nueva fila
            setFilas(prevFilas => [...prevFilas, {
                key: producto.id,
                columnaTitulo: 'titulo',
                columnaTipo: 'tipo',
                columnaCodigoBarra: 'codigo_barra',
                columnaPrecioCosto: 'precio_costo',
                columnaPrecioVenta: 'precio_venta',
                columnaStock: 'stock',
                columnaControlPorLote: 'usar_control_por_lote',
                columnaFechaVencimiento: 'fecha_vencimiento'
            }]);
            setValoresInputs(prevValores => [...prevValores, {
                key: producto?.id,
                titulo: producto?.titulo,
                tipo: "unidad",
                codigo_barra: producto?.codigo_barra,
                precio_costo: producto?.precio_costo,
                precio_venta: producto?.precio_venta,
                stock_actual: producto?.stock_actual,
                usar_control_por_lote: producto?.usar_control_por_lote,
                fecha_vencimiento: producto?.fecha_vencimiento
            }]);
        }
        reset()

        // Resto de tu lógica para valoresInputs y reset
    };



    const handleInputChange = (e, index, columna) => {
        const nuevosValoresInputs = [...valoresInputs];
        nuevosValoresInputs[index][columna] = e.target.value;
        setValoresInputs(nuevosValoresInputs);
    };

    const eliminarFila = (index) => {
        const nuevasFilas = [...filas];
        nuevasFilas.splice(index, 1);
        setFilas(nuevasFilas);

        const nuevosValoresInputs = [...valoresInputs];
        nuevosValoresInputs.splice(index, 1);
        setValoresInputs(nuevosValoresInputs);
    };

    useEffect(() => {
        console.log(valoresInputs);
    }, [valoresInputs])

    return (
        <>
            {/* BUSCADOR */}
            <div style={styles.listContainer}>
                <div className='flex justify-between my-auto'>
                    <div className='flex gap-4'>
                        {/* BUSCADOR */}
                        <div
                            style={styles.listContainer}
                            onFocus={handleInputFocus}
                        >
                            <div>
                                <div>
                                    <Input
                                        isClearable
                                        onClear={() => reset()}
                                        variant="bordered"
                                        className="w-full sm:max-w-[44%]"
                                        placeholder="Ingrese el código de barras o título"
                                        startContent={<SearchIcon />}
                                        value={inputText}
                                        ref={inputRef}
                                        onChange={handleInputSearchChange}
                                        onFocus={handleInputFocus}
                                        style={{ minWidth: '450px' }}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <ul
                                ref={listContainerRef}
                                style={{
                                    ...inputText ? styles.productosListWithBorder : styles.productosList,
                                    boxShadow: '7 10 6 rgba(0, 0, 0, 0.1)', // Aplica la sombra difuminada
                                    display: objetosBuscados.length > 0 || (inputText && !isLoading) ? 'block' : 'none',
                                }}
                            >
                                {objetosBuscados.length > 0 ? (
                                    objetosBuscados.map((producto, index) => (
                                        <li
                                            ref={index === selectedItem ? selectedItemRef : null}
                                            key={producto.id}
                                            style={{
                                                ...styles.containerRowProducto,
                                                ...(index === selectedItem && styles.selectedItem),
                                                ...(index === 0 && selectedItem === null && { borderTop: 'none' }), // Evita el borderTop solo cuando no estás seleccionando
                                                ...(index === objetosBuscados.length - 1 && selectedItem === null && { borderBottom: 'none' }), // Evita el borderBottom solo cuando no estás seleccionando

                                            }}
                                            className={`border-t ${index === objetosBuscados.length - 1 ? '' : 'border-b'}`}
                                            onClick={() => {
                                                agregarFilaConProducto(producto)
                                            }}
                                        >
                                            <p style={styles.productoTitulo}>{producto.titulo}</p>
                                            <p style={styles.productoPrecioVenta}>{producto.precio_venta ? `$${producto.precio_venta}` : ''}</p>
                                        </li>
                                    ))
                                ) : inputText && !isLoading ? (
                                    <li style={{ textAlign: 'center', padding: 8, backgroundColor: '#e2e2e2' }}>Sin Resultados</li>
                                ) : null}
                            </ul>
                        </div>
                        {/* FIN BUSCADOR */}
                        <div  className='flex' style={{paddingBottom: '20px'}}>
                            <Switch defaultSelected>
                                Editar precios
                            </Switch>
                        </div>
                    </div>
                    <div>
                        <Button
                            className="bg-foreground text-background"
                            endContent={<SaveIcon />}
                            onClick={() => { handleConfirmCompra() }}
                        >
                            Guardar Productos
                        </Button>
                    </div>
                </div>

            </div>
            {/* FIN BUSCADOR */}


            <div style={{ marginTop: 30 }}>
                <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full'>
                    <table className='min-w-full h-auto table-auto w-full' key={keyCounter}>
                        <thead className='[&>tr]:first:rounded-lg'>
                            <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                                <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>TÍTULO</th>
                                <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                                    <div className='flex gap-2'>
                                        TIPO
                                    </div>
                                </th>
                                <th
                                    style={{ maxWidth: "6.5rem", backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'
                                >
                                    PRECIO COSTO</th>
                                <th
                                    style={{ maxWidth: "6.5rem", backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'
                                >
                                    PRECIO VENTA</th>
                                <th
                                    style={{ maxWidth: '6rem', backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'
                                >
                                    STOCK
                                </th>
                                <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filas.map((fila, index) => (
                                <tr key={index} className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                                    <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                        <p style={{ border: '0.5px' }}>{valoresInputs[index].titulo}</p>
                                    </td>
                                    <td
                                        style={{ minWidth: '10rem' }}
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1  data-[focus-visible=true]:outline-focus before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                        {
                                            valoresInputs[index].tipo === "costo_adicional" ?
                                                <p>Costo Adicional</p> :
                                                valoresInputs[index].tipo === "fraccion" ?
                                                    <p>Fracción</p> :
                                                    valoresInputs[index].tipo === "unidad" ?
                                                        <p>Unidad</p> :
                                                        null // Si ninguno de los casos anteriores coincide, devuelve null
                                        }
                                    </td>
                                    <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                        {
                                            valoresInputs[index].tipo === "costo_adicional"
                                                ?
                                                <>
                                                    <input
                                                        style={{ maxWidth: '6.5rem' }}
                                                        type="number"
                                                        className='input-text'
                                                        disabled
                                                    />
                                                </>
                                                :
                                                <>
                                                    <input
                                                        style={{ maxWidth: '6.5rem' }}
                                                        type="number"
                                                        className='input-text'
                                                        value={valoresInputs[index].precio_costo}
                                                        onChange={(e) => handleInputChange(e, index, 'precio_costo')}
                                                    />
                                                    <p style={{ color: 'red' }}>{errores[`${fila.key}-precio_costo`] ?? ""}</p>
                                                </>
                                        }
                                    </td>
                                    <td
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                        {
                                            valoresInputs[index].tipo === "costo_adicional"
                                                ?
                                                <>
                                                    <Tooltip
                                                        content={
                                                            <div className="px-1 py-2">
                                                                <div className="text-small font-bold">SIN PRECIO VENTA</div>
                                                                <div className="text-tiny">En un producto de tipo "costo adicional" no se incluye el precio venta.</div>
                                                                <div className="text-tiny">Al cobrar, simplemente ingresa el monto del producto y el adicional.</div>
                                                            </div>
                                                        }
                                                    >
                                                        <div>
                                                            <input
                                                                style={{ maxWidth: '6.5rem' }}
                                                                type="number"
                                                                disabled
                                                                className='input-text'
                                                                value={valoresInputs[index].precio_costo}
                                                                onChange={(e) => handleInputChange(e, index, 'precio_costo')}
                                                            />
                                                        </div>
                                                    </Tooltip>
                                                </>
                                                :
                                                <>
                                                    <input
                                                        style={{ maxWidth: '6.5rem' }}
                                                        type="number"
                                                        className='input-text'
                                                        value={valoresInputs[index].precio_venta}
                                                        onChange={(e) => handleInputChange(e, index, 'precio_venta')}
                                                    />
                                                    <p style={{ color: 'red' }}>{errores[`${fila.key}-precio_venta`] ?? ""}</p>
                                                </>
                                        }
                                    </td>
                                    <td
                                        style={{ maxWidth: '7rem' }}
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                        <input
                                            type="number"
                                            style={{ maxWidth: '6rem' }}
                                            className='input-text'
                                            value={valoresInputs[index].stock_actual}
                                            onChange={(e) => handleInputChange(e, index, 'stock_actual')}
                                        />
                                        <p style={{ color: 'red' }}>{errores[`${fila.key}-stock_actual`] ?? ""}</p>
                                    </td>
                                    <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                        <button onClick={() => eliminarFila(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div>

        </>
    )
}

const styles = {
    listContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    productosList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        minWidth: '450px',
        maxHeight: '200px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        zIndex: 1,
    },
    containerRowProducto: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        backgroundColor: "#fbfbfb",
    },
    productoTitulo: {
        fontSize: '10pt',
    },
    productoPrecioVenta: {
        fontSize: "9pt",
    },
    selectedItem: {
        backgroundColor: "#818cf821",
        borderWidth: 1,
        borderColor: "#818cf8",
        borderRadius: 3,
    },
};

styles.productosListWithBorder = {
    ...styles.productosList,
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%'
};

export default TablaListStockPrecio
import React, { useState, useEffect, useRef } from 'react';
import ResumenPedido from './ResumenPedido';
import { useLectorContext } from '../../context/LectorContext';
import { debounce } from '../../utils/debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchIcon } from '../icons/SearchIcon';
import TeclaDetector from '../teclado/TeclaDetector';
import {
    Input,
    Select,
    SelectItem,
    AutocompleteItem,
    Autocomplete,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react";

function ListProductos({ productos, metodosDePago, clientes }) {
    const { productosSeleccionados, setProductosSeleccionados } = useLectorContext();
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
    const [estadoDelPago, setEstadoDelPago] = useState(null)
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = React.useState("");
    const [productosIniciales, setProductosIniciales] = useState(productos)
    const [objetosBuscados, setObjetosBuscados] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const inputRef = useRef(null);
    const selectedItemRef = useRef(null);
    const listContainerRef = useRef(null);
    const [inputText, setInputText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setProductosIniciales(productos);
        focusInput()
    }, [productos]);


    const handleConfirmVenta = () => {
        handleSubmit();
        setProductosSeleccionados([])
        toast.success('Venta realizada con éxito', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handleSubmit = () => {
        fetch('http://127.0.0.1:8000/api/ventas/crear', {
            method: 'POST', // Usar el método POST
            headers: {
                'Content-Type': 'application/json', // Asegurarse de enviar los datos en formato JSON
            },
            // Aquí debes incluir los datos que deseas enviar al servidor
            body: JSON.stringify({ 
                productos: productosSeleccionados, 
                cliente: clienteSeleccionado,
                estadoPago: estadoDelPago,
                metodoPago: metodoPagoSeleccionado
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const focusInput = () => inputRef.current.focus();

    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.select(); // Seleccionar todo el contenido del input
        }
    };

    const handleSelectionChange = (e) => {
        setMetodoPagoSeleccionado(e.target.value);
    };

    const reset = () => {
        focusInput();
        setObjetosBuscados([]);
        setInputText('')
    }
    const handleInputChange = (e) => {
        setIsLoading(true)
        const value = e.target.value;
        setInputText(value);
        debouncedSearchRef.current(value);
    }


    const realizarBusqueda = (textoBusqueda) => {
        const MAX_PRODUCTOS = 30;
        if (textoBusqueda === '') {
            setObjetosBuscados([]);
        } else {
            if (/^\d+$/.test(textoBusqueda)) {
                const productoEncontrado = productosIniciales.find((producto) => Number(producto.codigo_barra) === Number(textoBusqueda));
                if (productoEncontrado) {
                    addProducto(productoEncontrado)
                    focusInput()
                } else {
                    setObjetosBuscados([]);
                    handleInputFocus();
                }
            } else {
                const productosCoincidentes = productosIniciales.filter((producto) => producto.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()))
                    .slice(0, MAX_PRODUCTOS);
                setObjetosBuscados(productosCoincidentes);
            }
        }
        setIsLoading(false)
    }

    const debouncedSearchRef = useRef(debounce((textoBusqueda) => realizarBusqueda(textoBusqueda), 200));

    const addProducto = (producto) => {
        setProductosSeleccionados(prevProductos => {
            const productoExistente = prevProductos.find(p => (producto.titulo === p.titulo));
            if (productoExistente) {
                // Si el producto ya existe, incrementamos su stock en 1 y le agregamos el efecto highlighted
                setProductosSeleccionados((prevProductos) =>
                    prevProductos.map((p) =>
                        p.titulo === producto.titulo
                            ? { ...p, highlighted: false }
                            : p
                    )
                );

                return prevProductos.map(p => {
                    if (p.titulo === productoExistente.titulo) {
                        return {
                            ...p,
                            cantidad: p.cantidad + 1,
                            highlighted: true
                        };
                    }
                    return p;
                });
            } else {
                producto = { ...producto, highlighted: false, cantidad: 1 }
                return [producto, ...prevProductos];
            }
        });
        reset();
    };


    const onSelectionChange = (id) => {
        setClienteSeleccionado(id);
        setEstadoDelPago("3")
    };

    useEffect(() => {
        console.log('estado pago:', estadoDelPago)
    }, [estadoDelPago])

    const handleSelectionChangeEstadoPago = (e) => {
        setEstadoDelPago(e.target.value);
    };

    useEffect(() => {
        if (!clienteSeleccionado && productosSeleccionados.length > 0)
            setEstadoDelPago(null)
        if (productosSeleccionados.length === 0 && clienteSeleccionado)
            setClienteSeleccionado(null)
    }, [clienteSeleccionado, productosSeleccionados])


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
            addProducto(objetosBuscados[selectedItem]);
        } else if (e.key === 'F12' && productosSeleccionados.length > 0) {
            console.log('cargo compra')
        }
    };

    useEffect(() => {
        setSelectedItem(null);
    }, [inputText]);

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

    return (
        <>
            <TeclaDetector onKeyPress={onOpen} />
            <div className='flex justify-between'>
                {/* BUSCADOR */}
                <div
                    style={styles.listContainer}
                    onFocus={handleInputFocus}
                >
                    <div className=''>
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
                                onChange={handleInputChange}
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
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', // Aplica la sombra difuminada
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
                                        addProducto(producto)
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


                <div>
                    <button
                        type="button"
                        style={{
                            borderWidth: 1,
                            padding: 9,
                            backgroundColor: "#4c4c4c",
                            color: "#ffff",
                            borderRadius: 5,
                            visibility: productosSeleccionados.length <= 0 ? 'hidden' : 'visible'
                        }}
                        onClick={onOpen}
                    >
                        Cargar Venta
                    </button>
                </div>
            </div>

            {/* MODAL CONFIRMACION */}
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <h2 className="font-semibold text-xl leading-tight pb-3">¿Estás seguro que deseas cargar la venta?</h2>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={handleConfirmVenta} onPressChange={onClose}>
                                    Cargar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* FIN MODAL */}

            

            {
                productosSeleccionados.length > 0
                    ?
                    <>
                        <div className='flex gap-3 mb-4'>
                            <div className="flex max-w-xs flex-wrap md:flex-nowrap gap-4">
                                <Autocomplete
                                    label="Cliente"
                                    className="max-w-xs"
                                    size='sm'
                                    defaultSelectedKeys={["1"]}
                                    onSelectionChange={onSelectionChange}
                                >
                                    {clientes.map((cliente) => (
                                        <AutocompleteItem key={cliente.id} value={cliente.id}>
                                            {cliente.nombre}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                            </div>

                            <Select
                                isRequired
                                label="Método de pago"
                                className="max-w-xs"
                                size='sm'
                                onChange={handleSelectionChange}
                            >
                                {metodosDePago.map((metodo) => (
                                    <SelectItem key={metodo.id} value={metodo.id}>
                                        {metodo.nombre} 
                                    </SelectItem>
                                ))}
                            </Select>

                            {
                                clienteSeleccionado
                                    ?
                                    <>
                                        <Select
                                            isRequired
                                            size='sm'
                                            defaultSelectedKeys={["3"]}
                                            className="max-w-xs"
                                            onChange={handleSelectionChangeEstadoPago}
                                        >
                                            <SelectItem key="1" value="1">
                                                Cobrada
                                            </SelectItem>
                                            <SelectItem key="2" value="2">
                                                No Cobrada
                                            </SelectItem>
                                            <SelectItem key="3" value="4">
                                                Parcialmente Cobrada
                                            </SelectItem>

                                        </Select>
                                        {
                                            estadoDelPago === "3"
                                                ?
                                                <Input
                                                    className="max-w-xs"
                                                    type="number"
                                                    label="Importe"
                                                    placeholder="0.00"
                                                    size='sm'
                                                    startContent={
                                                        <div className="pointer-events-none flex items-center">
                                                            <span className="text-default-400 text-small">$</span>
                                                        </div>
                                                    }
                                                />
                                                : ""
                                        }
                                    </>
                                    : ''
                            }

                        </div>
                        <ResumenPedido />

                    </>
                    :
                    ""
            }

            <ToastContainer />
        </>
    );
}

const styles = {
    listContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    productosList: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderRadius: '8px',
        minWidth: '450px',
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        zIndex: 999,
        padding: 8,
        marginTop: 4,
    },
    containerRowProducto: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        backgroundColor: "#fff"
    },
    productoTitulo: {
        fontSize: '10pt',
    },
    productoPrecioVenta: {
        fontSize: "9pt",
    },
    modalVenta: {
        position: 'fixed',
        background: '#0000003b',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: '999999',
        display: 'block',
        transitionDuration: '.2s',
    },
    modalContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '2rem 3rem',
        borderRadius: '11px',
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
};

export default ListProductos;

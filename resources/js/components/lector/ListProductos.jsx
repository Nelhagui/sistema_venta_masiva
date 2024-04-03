import React, { useState, useEffect, useRef } from 'react';
import ResumenPedido from './resumen_pedido/ResumenPedido';
import { useLectorContext } from '../../context/LectorContext';
import { debounce } from '../../utils/debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchIcon } from '../icons/SearchIcon';
import TeclaDetector from '../teclado/TeclaDetector';
import NovedadesInstructivos from './novedades_instructivos/NovedadesInstructivos';
import lectorServices from '../../services/lectorServices';
import { capitalizeToUpperCase } from '../../utils/utils';
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
    const {
        productosSeleccionados,
        setProductosSeleccionados,
        montoAbonado,
        setMontoAbonado,
        resetAll,
        aumento,
        descuento,
        metodoPagoSeleccionado,
        setMetodoPagoSeleccionado,
        setIdUltimaVenta
    } = useLectorContext();
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
    const [estadoDelPago, setEstadoDelPago] = useState(null)
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
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const id = toast.loading("Procesando datos, aguarde...", {
            isLoading: true,
            position: "bottom-right",
            closeOnClick: true,
            theme: "colored",
        })
        try {
            const resultado = await lectorServices.crearVenta(
                productosSeleccionados,
                clienteSeleccionado,
                estadoDelPago,
                metodoPagoSeleccionado,
                montoAbonado,
                aumento,
                descuento
            );
            if (resultado.ok) {
                toast.update(id, {
                    isLoading: false,
                    autoClose: 9000,
                    render: "Proceso finalizado correctamente!",
                    type: "success",
                });
                setIdUltimaVenta(resultado.data.id_ultima_venta);
                resetAll();
                reset();
                setMetodoPagoSeleccionado("0");
            } else {
                // La petición no fue exitosa, manejar el error utilizando resultado.error
                toast.update(id, {
                    isLoading: false,
                    render: "Proceso incompleto, vuelva a intentarlo.",
                    type: "error",
                });
            }

        } catch (error) {
            toast.update(id, {
                isLoading: false,
                render: "Proceso incompleto, vuelva a intentarlo o contacte con soporte.",
                type: "error",
            });
        } finally {
            setIsLoading(false);
            console.log('finally');
        }
    };

    const focusInput = () => inputRef.current.focus();

    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.select(); // Seleccionar todo el contenido del input
        }
    };

    useEffect(() => {
        if (metodosDePago.length > 0) {
            metodosDePago.forEach(metodo => {
                if (metodo.predeterminado) {
                    setMetodoPagoSeleccionado(metodo.id)
                }
            });
        }
    }, [metodosDePago])

    const handleSelectionChange = (e) => {
        setMetodoPagoSeleccionado(e.target.value);
    };

    const reset = () => {
        focusInput();
        setObjetosBuscados([]);
        setInputText('')
    }
    const handleInputChange = (e) => {
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
                    addProducto(productoEncontrado);
                    focusInput();
                } else {
                    setObjetosBuscados([]);
                    handleInputFocus();
                }
            } else {
                const palabrasBusqueda = textoBusqueda.trim().toLowerCase().split(' ').filter(Boolean); // filter(Boolean) elimina espacios en blanco
                const productosCoincidentes = productosIniciales.map(producto => {
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
                setObjetosBuscados(productosCoincidentes);
            }
        }
    }

    const debouncedSearchRef = useRef(debounce((textoBusqueda) => realizarBusqueda(textoBusqueda), 200));

    const setearCantidad = (producto) => {

        if (producto?.tipo === 'fraccion') {
            return 0.100;
        } else {
            return 1;
        }
    }
    const setearMonto = (producto) => {

        if (producto?.tipo === 'fraccion') {
            return setearCantidad(producto) * producto.precio_venta;
        } else {
            return 1;
        }
    }

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
                producto = { ...producto, highlighted: false, cantidad: setearCantidad(producto), monto: setearMonto(producto) }
                return [producto, ...prevProductos];
            }
        });
        reset();
    };


    const onSelectionChange = (id) => {
        setClienteSeleccionado(id);
        setEstadoDelPago("3")
    };

    const handleSelectionChangeEstadoPago = (e) => {
        setEstadoDelPago(e.target.value);
    };

    useEffect(() => {
        if (!clienteSeleccionado && productosSeleccionados.length > 0) {
            setEstadoDelPago(null)
        }
        if (productosSeleccionados.length === 0 && clienteSeleccionado) {
            setClienteSeleccionado(null)
            setMontoAbonado('');
        }
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
        }
    };

    const handleInputImporte = (event) => {
        setMontoAbonado(event.target.value);
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
            {/* <TeclaDetector onKeyPress={onOpen} /> */}
            <div className='flex justify-between'>
                {/* BUSCADOR */}
                <div
                    style={styles.listContainer}
                    onFocus={handleInputFocus}
                >
                    <div>
                        <div>
                            <Input
                                isDisabled={isLoading}
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
                                    <p style={styles.productoTitulo}>
                                        {capitalizeToUpperCase(producto.titulo)}
                                    </p>
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
                        {
                            isLoading
                                ? "Cargando compra..."
                                : "Cargar Venta"
                        }
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
                        <div className='flex gap-3'>
                            <div className='w-full'>
                                <ResumenPedido />
                            </div>
                            <div className='flex flex-col min-w-max gap-2 px-3'>
                                <div className='flex flex-col gap-2 p-3 rounded' style={{ backgroundColor: '#fcfcfc', borderWidth: 1, borderColor: "#e7e8ff" }}>

                                    <Autocomplete
                                        label="Cliente"
                                        variant="bordered"
                                        fullWidth
                                        className="bg-white"
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

                                    <Select
                                        isRequired
                                        label="Método de pago"
                                        className="min-w-min bg-white"
                                        size='sm'
                                        variant="bordered"
                                        fullWidth
                                        onChange={handleSelectionChange}
                                        defaultSelectedKeys={[`${metodoPagoSeleccionado}`]}
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
                                                    className="max-w-xs bg-white"
                                                    variant="bordered"
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
                                                            variant="bordered"
                                                            className="max-w-xs bg-white"
                                                            type="number"
                                                            label="Importe"
                                                            placeholder="0.00"
                                                            onChange={handleInputImporte}
                                                            value={montoAbonado}
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
                            </div>
                        </div>

                    </>
                    :
                    <>
                        <div className='mt-10'>
                            {/* <NovedadesInstructivos /> */}
                        </div>
                    </>
            }

            <ToastContainer />
        </>
    );
}

const styles = {
    listContainer: {
        position: 'relative',
        marginBottom: 15,
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

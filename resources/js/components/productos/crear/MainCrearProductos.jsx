
import { createRoot } from 'react-dom/client';
import { Button, Tooltip, Select, SelectItem, Divider, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import productoServices from '../../../services/productoServices';
import productosBaseServices from '../../../services/productosBaseServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfoIcon } from '../../icons/InfoIcon';
import { SaveIcon } from '../../icons/SaveIcon';
import MagicIcon from "../../icons/magicIcon.png"
import { HelpIcon } from '../../icons/HelpIcon';

export default function MainCrearProductos() {

    const [filas, setFilas] = useState([]);
    const [valoresInputs, setValoresInputs] = useState([]);
    const [buscandoCoincidencias, setBuscandoCoincidencias] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errores, setErrores] = useState([]);
    const [keyCounter, setKeyCounter] = useState(0);

    // CALCULO DE VALOR COSTO
    const [cantidad, setCantidad] = useState('');
    const [valor, setValor] = useState('');
    const [precioCosto, setPrecioCosto] = useState('');

    const resetAsisCosto = () => {
        setCantidad('')
        setValor('')
        setPrecioCosto('')
    }

    const handleCantidadChange = (event) => {
        const nuevaCantidad = event.target.value;
        setCantidad(nuevaCantidad);
        calcularValorCosto(nuevaCantidad, valor);
    };

    const handleValorChange = (event) => {
        const nuevoValor = event.target.value;
        setValor(nuevoValor);
        calcularValorCosto(cantidad, nuevoValor);
    };

    const calcularValorCosto = (cantidad, valor) => {
        const cantidadFloat = parseFloat(cantidad);
        const valorFloat = parseFloat(valor);

        if (!isNaN(cantidadFloat) && !isNaN(valorFloat) && cantidadFloat !== 0) {
            const nuevoPrecioCosto = valorFloat / cantidadFloat;
            setPrecioCosto(nuevoPrecioCosto.toFixed(2));
        } else {
            setPrecioCosto('');
        }
    };
    const handleInputCostoAsistente = (precioCosto, index) => {
        const nuevosValoresInputs = [...valoresInputs];
        nuevosValoresInputs[index]['precio_costo'] = precioCosto;
        setValoresInputs(nuevosValoresInputs);
    };
    // FIN CALCULO VALOR COSTO

    // CALCULO VALOR CON PORCENTAJE
    const [porcentaje, setPorcentaje] = useState('');
    const [precioConAumento, setPrecioConAumento] = useState('');

    const resetAsisVenta = () => {
        setPorcentaje('')
        setPrecioConAumento('')
    }

    const handlePorcentajeChange = (e, index) => {
        const nuevoPorcentaje = e.target.value;
        setPorcentaje(nuevoPorcentaje);
        const precioBase = valoresInputs[index]['precio_costo'];
        calcularPrecioConAumento(nuevoPorcentaje, precioBase);
    };

    const calcularPrecioConAumento = (porcentaje, precioBase) => {
        const porcentajeFloat = parseFloat(porcentaje);
        const precioBaseFloat = parseFloat(precioBase);

        if (!isNaN(porcentajeFloat) && !isNaN(precioBaseFloat)) {
            const aumento = (porcentajeFloat / 100) * precioBaseFloat;
            const precioConAumento = precioBaseFloat + aumento;
            setPrecioConAumento(precioConAumento.toFixed(2));
        } else {
            setPrecioConAumento('');
        }
    };

    const handleInputVentaAsistente = (precioVenta, index) => {
        const nuevosValoresInputs = [...valoresInputs];
        nuevosValoresInputs[index]['precio_venta'] = precioVenta;
        setValoresInputs(nuevosValoresInputs);
    };
    // FIN VALOR CON PORCENTAJE

    // Crear la fila por defecto
    useEffect(() => {
        agregarFila();
    }, []); // Se ejecuta solo una vez al montar el componente


    const handleConfirmCompra = () => {
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
            const response = await productoServices.crear(valoresInputs);
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
                        autoClose: 3000,
                        render: "Error inesperado, contacte con soporte",
                        type: "error",
                    });
                }
                toast.update(id, {
                    isLoading: false,
                    autoClose: 3000,
                    render: "Proceso incompleto, revise los campos",
                    type: "error",
                });
            } else {
                toast.update(id, {
                    isLoading: false,
                    autoClose: 9000,
                    render: "Proceso finalizado correctamente!",
                    type: "success",
                });
                resetAll();
            }
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    const resetAll = () => {
        setErrores([]);
        setValoresInputs([]);
        setFilas([]);
        agregarFila();
        // Incrementar el contador de claves únicas para forzar el remontaje de la tabla
        setKeyCounter(prevCounter => prevCounter + 1);

    }

    const generarIdUnico = (() => {
        let contador = 0;
        return () => {
            const fechaActual = new Date().getTime();
            return `${fechaActual}-${contador++}`;
        };
    })();

    const agregarFila = () => {
        const id = generarIdUnico(); // Genera un identificador único
        setFilas(prevFilas => [...prevFilas, {
            key: id,
            columnaTitulo: 'titulo',
            columnaTipo: 'tipo',
            columnaCodigoBarra: 'codigo_barra',
            columnaPrecioCosto: 'precio_costo',
            columnaPrecioVenta: 'precio_venta',
            columnaStock: 'stock'
        }]);
        setValoresInputs(prevValores => [...prevValores, {
            key: id,
            titulo: '',
            tipo: "unidad",
            codigo_barra: '',
            precio_costo: '',
            precio_venta: '',
            stock_actual: ''
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
        setValoresInputs(nuevosValoresInputs);
    };

    const completaAutomaticamente = async () => {
        const codigosBarra = [];
        valoresInputs.forEach(input => {
            if (input.codigo_barra) {
                codigosBarra.push(input.codigo_barra);
            }
        });

        if (codigosBarra.length === 0) {
            toast.warn('No hay códigos de barras ingresados para buscar títulos automáticamente');
            return;
        }

        try {
            setBuscandoCoincidencias(true)
            // Realizar la búsqueda en el archivo productos.json utilizando los códigos de barras
            const response = await productosBaseServices.traerCoincidenciasConCodigoBarra(codigosBarra);
            const productos = await response.json();
            if (productos.length > 0) {
                // Actualizar los títulos correspondientes en el arreglo valoresInputs
                setTimeout(() => {
                    const nuevosValoresInputs = [...valoresInputs];

                    nuevosValoresInputs.forEach(input => {
                        if (codigosBarra.includes(input.codigo_barra)) {
                            const productoEncontrado = productos.find(producto => producto.codigo_barra === input.codigo_barra);
                            if (productoEncontrado && !input.titulo) {
                                input.titulo = productoEncontrado.titulo;
                            }
                        }
                    });
                    setValoresInputs(nuevosValoresInputs);

                    toast.success('Títulos actualizados automáticamente', {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }, 2000); // Retraso de 2 segundos (2000 milisegundos)

                
            } else {
                toast.warn('No hay códigos de barras que coincidan con los productos almacenados en nuestro sistema');
            }
        } catch (error) {
            console.error('Error al buscar títulos automáticamente:', error);
            toast.error('Error al buscar títulos automáticamente');
        }
        setTimeout(() => {
            setBuscandoCoincidencias(false)
        }, 2000); // Retraso de 2 segundos (2000 milisegundos)
    };


    return (
        <div style={{ marginTop: 30 }}>

            <div>
                <Button
                    style={{ padding: 10, marginRight: 5 }}
                    className={buscandoCoincidencias ? 'boton-degrades animado' : 'boton-degrades'}
                    onClick={() => completaAutomaticamente()}
                    isDisabled={buscandoCoincidencias}
                >
                    {
                        buscandoCoincidencias
                            ? "Procesando información ..."
                            : "Completado automático"
                    }

                    <div className="contenedor-img-animada" style={{ width: 23 }}>
                        <img src={MagicIcon} alt="" width={23} className={buscandoCoincidencias ? 'imagen-animada' : 'detenido'} />
                    </div>
                </Button>
                <div className='flex items-center gap-1 mt-1'>
                    <p className='text-descripcion' style={{ fontSize: 12, marginLeft: 5 }}>
                        Rellena de forma automática los títulos.
                    </p>
                    <Popover placement="right">
                        <PopoverTrigger>
                            <p className='text-descripcion' style={{ fontSize: 13, textDecorationLine: 'underline' }}>Más info</p>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-bold">Rellenado automático</div>
                                <div className="text-tiny">Completa de forma automática con</div>
                                <div className="text-tiny">sugerencias de títulos en aquellas filas que</div>
                                <div className="text-tiny">contengan un código de barra.</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className='d-flex' style={{ textAlign: 'end', marginBlock: '0 10px', marginBottom: 20 }}>
                <Button
                    isDisabled={buscandoCoincidencias}
                    className="bg-foreground text-background"
                    endContent={<SaveIcon />}
                    onClick={() => { handleConfirmCompra() }}
                >
                    Guardar Productos
                </Button>
            </div>
            <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full'>
                <table className='min-w-full h-auto table-auto w-full' key={keyCounter}>
                    <thead className='[&>tr]:first:rounded-lg'>
                        <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>TÍTULO</th>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                                <div className='flex gap-2'>
                                    TIPO
                                    <Tooltip
                                        placement='bottom'
                                        content={
                                            <div className="px-1 py-2">
                                                <div className='p-1'>
                                                    <div className="text-medium font-bold">Unidad</div>
                                                    <div className="text-tiny">Vendido individualmente</div>
                                                    <div className="text-tiny">Ejemplo: Una Camiseta, Un encendedor.</div>
                                                </div>
                                                <Divider className='my-2' />
                                                <div className='p-1'>
                                                    <div className="text-medium font-bold">Fracción</div>
                                                    <div className="text-tiny">Dividido en partes</div>
                                                    <div className="text-tiny">Ejemplo: Queso por gramo, Pan.</div>
                                                </div>
                                                <Divider className='my-2' />
                                                <div className='p-1'>
                                                    <div className='flex'>
                                                        <div>
                                                            <div className="text-medium font-bold">Costo Adicional</div>
                                                            <div className="text-tiny mt-1">Un ejemplo podría ser </div>
                                                            <div className="text-tiny mt-1">el adicional para la Recarga de tarjeta SUBE.</div>
                                                        </div>
                                                        <div className='text-center'>
                                                            <span style={{ backgroundColor: '#818cf8', padding: 4, borderRadius: 6, color: 'white' }}>NUEVO</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <span style={{ cursor: 'pointer' }} className="text-lg text-default-400 cursor-pointer">
                                            <InfoIcon fill='#ffffff' size={20} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </th>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>CÓDIGO BARRA</th>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>PRECIO COSTO</th>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>PRECIO VENTA</th>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>STOCK</th>
                            <th style={{ backgroundColor: '#999cbe', color: 'white' }} className='group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((fila, index) => (
                            <tr key={index} className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'>
                                <td
                                    style={{ minWidth: '12rem' }}
                                    className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        disabled={buscandoCoincidencias}
                                        type="text"
                                        className={buscandoCoincidencias && !valoresInputs[index].titulo && valoresInputs[index].codigo_barra ? 'boton-degrades animado w-full input-text' : 'input-text w-full'}
                                        value={valoresInputs[index].titulo}
                                        onChange={(e) => handleInputChange(e, index, 'titulo')}
                                        placeholder={buscandoCoincidencias && !valoresInputs[index].titulo && valoresInputs[index].codigo_barra ? "Buscando" : ""}
                                    />
                                    <p style={{ color: 'red' }}>{errores[`${fila.key}-titulo`] ?? ""}</p>
                                </td>
                                <td
                                    style={{ minWidth: '10rem' }}
                                    className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1  data-[focus-visible=true]:outline-focus before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">

                                    <Select
                                        placeholder="Seleccione tipo"
                                        labelPlacement="outside"
                                        variant='bordered'
                                        defaultSelectedKeys={["unidad"]}
                                        // disabledKeys={["costo_adicional"]}
                                        aria-label="Tipo de Producto"
                                        onChange={(e) => handleInputChange(e, index, 'tipo')}
                                        className='min-w-min'
                                        fullWidth
                                        size='sm'
                                    >
                                        <SelectItem key="unidad" textValue="Unidad" SelectItem>
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-small">Unidad</span>
                                                    <span className="text-tiny text-default-400"></span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem key="fraccion" textValue="Fracción">
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-small">Fracción</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem key="costo_adicional" textValue="Costo Adicional">
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-small">Costo Adicional</span>
                                                    <span className="text-tiny text-default-400"></span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    </Select>
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        disabled={buscandoCoincidencias}
                                        type="number"
                                        className='input-text'
                                        value={valoresInputs[index].codigo_barra}
                                        onChange={(e) => handleInputChange(e, index, 'codigo_barra')}
                                    />
                                    <p style={{ color: 'red' }}>{errores[`${fila.key}-codigo_barra`] ?? ""}</p>
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    {
                                        valoresInputs[index].tipo === "costo_adicional"
                                            ?
                                            <>
                                                <Tooltip
                                                    content={
                                                        <div className="px-1 py-2">
                                                            <div className="text-small font-bold">SIN PRECIO COSTO</div>
                                                            <div className="text-tiny">En un producto de tipo "costo adicional" no se incluye el precio costo.</div>
                                                            <div className="text-tiny">Al cobrar, simplemente ingresa el monto del producto y el adicional.</div>
                                                        </div>
                                                    }
                                                >
                                                    <div>
                                                        <input
                                                            type="number"
                                                            disabled
                                                            style={{ maxWidth: '6rem' }}
                                                            className='input-text'
                                                            value={valoresInputs[index].precio_costo}
                                                            onChange={(e) => handleInputChange(e, index, 'precio_costo')}
                                                        />

                                                    </div>
                                                </Tooltip>
                                            </>
                                            :
                                            <>
                                                <div className='flex items-center gap-1' style={{ maxWidth: '6rem' }}>
                                                    <input
                                                        type="number"
                                                        style={{ maxWidth: '6rem' }}
                                                        className='input-text'
                                                        value={valoresInputs[index].precio_costo}
                                                        onChange={(e) => handleInputChange(e, index, 'precio_costo')}
                                                    />
                                                    <Popover placement="right">
                                                        <PopoverTrigger>
                                                            <span onClick={() => resetAsisCosto()}>
                                                                <HelpIcon fill='#7f8af7' />
                                                            </span>
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <div className="px-1 py-2">
                                                                <div className="text-small font-bold mb-1">Calculadora de Precio por Unidad:</div>
                                                                <div className="text-tiny">Ingrese la cantidad total de productos y  </div>
                                                                <div className="text-tiny">el <strong>precio del paquete</strong> para obtener <strong>el costo</strong> </div>
                                                                <div className="text-tiny"> <strong>individual</strong> de cada producto que se vende en un paquete</div>
                                                                {/* <div className="text-tiny">Asistente para calcular costo individual de productos que venden en paquetes.</div> */}
                                                                <div>
                                                                    <div className="my-3">
                                                                        <label htmlFor="cantidad_precio_costo">Cantidad</label><br />
                                                                        <input
                                                                            type="number"
                                                                            id="cantidad_precio_costo"
                                                                            step="any"
                                                                            value={cantidad}
                                                                            onChange={handleCantidadChange}
                                                                            className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                    <div className="my-3">
                                                                        <label htmlFor="valor_precio_costo">Valor</label><br />
                                                                        <input
                                                                            type="number"
                                                                            id="valor_precio_costo"
                                                                            step="any"
                                                                            value={valor}
                                                                            onChange={handleValorChange}
                                                                            className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                    <div className="my-3">
                                                                        <label htmlFor="precio_costo">Precio Costo</label><br />
                                                                        <input
                                                                            type="number"
                                                                            id="precio_costo"
                                                                            step="any"
                                                                            value={precioCosto}
                                                                            className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                    <div className="my-3">
                                                                        <Button
                                                                            className='bg-personalizado text-white'
                                                                            isDisabled={precioCosto === ''}
                                                                            onClick={() => handleInputCostoAsistente(precioCosto, index)}
                                                                        >
                                                                            Usar Costo
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <p style={{ color: 'red' }}>{errores[`${fila.key}-precio_costo`] ?? ""}</p>

                                            </>
                                    }
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
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
                                                            type="number"
                                                            disabled
                                                            style={{ maxWidth: '6rem' }}
                                                            className='input-text'
                                                            value={valoresInputs[index].precio_venta}
                                                            onChange={(e) => handleInputChange(e, index, 'precio_venta')}
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </>
                                            :
                                            <>
                                                <div className='flex items-center gap-1' style={{ maxWidth: '6rem' }}>
                                                    <input
                                                        type="number"
                                                        style={{ maxWidth: '6rem' }}
                                                        className='input-text'
                                                        value={valoresInputs[index].precio_venta}
                                                        onChange={(e) => handleInputChange(e, index, 'precio_venta')}
                                                    />
                                                    <Popover placement="right">
                                                        <PopoverTrigger>
                                                            <span onClick={() => resetAsisVenta()}>
                                                                <HelpIcon fill='#7f8af7' />
                                                            </span>
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <div className="px-1 py-2">
                                                                {
                                                                    valoresInputs[index].precio_costo === null || valoresInputs[index].precio_costo === ''
                                                                        ? <p style={{
                                                                            paddingTop: '15px',
                                                                            paddingBottom: '5px',
                                                                            fontSize: 16,
                                                                            color: 'red'
                                                                        }}>Se Requiere "precio costo"</p>
                                                                        : null
                                                                }
                                                                <div className={
                                                                    valoresInputs[index].precio_costo === null || valoresInputs[index].precio_costo === ''
                                                                    ? 'estilo-disabled'
                                                                    : ''
                                                                }>
                                                                    <div className="text-small font-bold mb-1">Calculadora de Precio de Venta:</div>
                                                                    <div className="text-tiny">Ingrese el porcentaje deseado sobre el costo del </div>
                                                                    <div className="text-tiny">producto para obtener el precio de venta sugerido.</div>
                                                                    {/* <div className="text-tiny">Asistente para calcular costo individual de productos que venden en paquetes.</div> */}
                                                                    <div>
                                                                        <div className="my-3">
                                                                            <label htmlFor="porcentaje_venta">Porcentaje</label><br />
                                                                            <input
                                                                                type="number"
                                                                                id="porcentaje_venta"
                                                                                step="any"
                                                                                disabled={valoresInputs[index].precio_costo === null || valoresInputs[index].precio_costo === ''}
                                                                                value={porcentaje}
                                                                                onChange={(e) => handlePorcentajeChange(e, index)}
                                                                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            />
                                                                        </div>

                                                                        <div className="my-3">
                                                                            <label htmlFor="precio_con_aumento">Precio Sugerido</label><br />
                                                                            <input
                                                                                type="number"
                                                                                id="precio_con_aumento"
                                                                                step="any"
                                                                                value={precioConAumento}
                                                                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                readOnly
                                                                                disabled={true}
                                                                            />
                                                                        </div>
                                                                        <div className="my-3">
                                                                            <Button
                                                                                className='bg-personalizado text-white'
                                                                                onClick={() => handleInputVentaAsistente(precioConAumento, index)}
                                                                                isDisabled={precioConAumento === ''}
                                                                            >
                                                                                Usar Precio Venta
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <p style={{ color: 'red' }}>{errores[`${fila.key}-precio_venta`] ?? ""}</p>
                                            </>
                                    }
                                </td>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg">
                                    <input
                                        type="number"
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
            <div className='d-flex text-center mt-4'>
                <Button variant="ghost" onClick={() => agregarFila()}>Agregar Fila</Button>
            </div>
            <ToastContainer />
        </div>
    )
}

if (document.getElementById('mainCrearProductos')) {
    const domNode = document.getElementById('mainCrearProductos');
    const root = createRoot(domNode);
    root.render(<MainCrearProductos />);
}
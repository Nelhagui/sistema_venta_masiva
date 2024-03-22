import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import cajaServices from '../../../services/cajaServices';
import { Button, Input } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatearAMoneda } from '../../../utils/utils';

export default function CajaEgresos() {
    const [isLoading, setIsLoading] = useState(false)
    const [montoTotal, setMontoTotal] = useState(0)
    const [ultimaSesion, setUltimaSesion] = useState([])
    const [ultimosEgresos, setUltimosEgresos] = useState([])
    const [data, setData] = useState({})
    const [msjError, setMsjError] = useState({
        monto: null,
        descripcion: null,
    })
    const [camposObligatorios] = useState(['monto'])

    useEffect(() => {
        setData({
            monto: '',
            descripcion: '',
        })
        setMsjError(null)
        fetchCajaEgresos()

    }, [])



    const fetchCajaEgresos = async () => {
        try {
            const response = await cajaServices.traerEgresos();
            setMontoTotal(response.total);
            setUltimaSesion(response.ultimaSesion);
            setUltimosEgresos(response.ultimosEgresos);
        } catch (error) {
            // Maneja el error si la creación de la venta falla
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    const onChangeValue = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }

    const onPressSubmit = () => {
        let errores = [];
        let objetoErrores = {};
        camposObligatorios.forEach((campo) => {
            if (!data[campo] || data[campo] === "") {
                errores.push(`El campo ${campo} es obligatorio.`);
                objetoErrores[campo] = "campo obligatorio";
            }
        });
        if (errores.length > 0) {
            setMsjError({ ...msjError, ...objetoErrores });
        } else {
            fetchService();
        }
    }

    const fetchService = async () => {
        setIsLoading(true);
        const id = toast.loading("Procesando datos, aguarde...", {
            isLoading: true,
            position: "top-right",
            closeOnClick: true,
            theme: "colored",
        })
        try {
            const response = await cajaServices.retirarMonto(data);
            if (response.status === 200) {
                toast.update(id, {
                    isLoading: false,
                    render: "Proceso finalizado correctamente!",
                    type: "success",
                });
                fetchCajaEgresos();
                setData({
                    monto: '',
                    descripcion: '',
                })
            } else {
                toast.update(id, {
                    isLoading: false,
                    render: response.message,
                    type: "error",
                });
               
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-red-200 p-5 rounded">
                <div className="flex flex-col">
                    <div className="flex flew-row justify-between">
                        <div className="flex items-center">
                            <div className="text-center">
                                <p>Efectivo en Caja</p>
                                <p className="text-4xl">${formatearAMoneda(montoTotal)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 max-w-2xl w-auto">
                        <form action="{{route('store.egresoCaja', $ultimaSesion->id)}}" method="POST">
                            <div className="flex flex-col mb-5 w-52 mt-3">
                                <Input
                                    label="Monto total a retirar"
                                    labelPlacement='outside'
                                    placeholder="Ingrese el monto a retirar"
                                    isDisabled={isLoading}
                                    name="monto"
                                    type="number"
                                    value={data?.monto}
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.monto ?? false}
                                    errorMessage={msjError?.monto ?? ''}
                                />
                                
                            </div>
                            <div className="flex flex-col mb-5">
                                <Input
                                    label="Descripción motivo de egreso"
                                    labelPlacement='outside'
                                    placeholder="Escriba el motivo de egreso de efectivo"
                                    isDisabled={isLoading}
                                    name="descripcion"
                                    type="text"
                                    value={data?.descripcion}
                                    onChange={onChangeValue}
                                    isInvalid={msjError?.descripcion ?? false}
                                    errorMessage={msjError?.descripcion ?? ''}
                                />
                            </div>
                            <div>
                                <Button
                                    color="danger"
                                    onPress={onPressSubmit}
                                    isDisabled={isLoading}
                                >
                                    GUARDAR RETIRO
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <div className="flex items-center mt-6 flex-col max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="my-2 text-left">
                    {/* <p className="text-left">Últimos {{$ultimosEgresos->count()}} registros:</p> */}
                </div>
                <div className='mt-4 p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded shadow-small w-full'>
                    <table className='min-w-full h-auto table-auto w-full' >
                        <thead className='[&>tr]:first:rounded-lg' style={{ textAlign: 'start' }}>
                            <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2' style={{ textAlign: 'start' }}>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>ID</th>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CAJA INICIADA POR</th>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>MONTO RETIRADO</th>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>DESCRIPCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ultimosEgresos && ultimosEgresos.length !== 0 ?
                                ultimosEgresos.map((egreso, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'} style={{ textAlign: 'start' }}>                                                  
                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>{egreso?.id}</p>
                                            </td>
                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>{egreso?.user?.nombre}</p>
                                            </td>

                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>${egreso?.monto}</p>
                                            </td>
                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>{egreso?.descripcion ?? "-"}</p>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr className='text-center'>
                                        <td colSpan="10" className='py-3'>No se registraron retiros dentro de esta fecha</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

if (document.getElementById('CajaEgresos')) {
    const domNode = document.getElementById('CajaEgresos');
    const root = createRoot(domNode);
    root.render(<CajaEgresos />);
}
import { createRoot } from "react-dom/client"
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cajaServices from "../../../services/cajaServices";


export default function CajaIngresos(){
    const [isLoading, setIsLoading] = useState(false)
    const [montoTotal, setMontoTotal] = useState(0)
    const [ultimaSesion, setUltimaSesion] = useState(0)
    const [ultimosIngresos, setUltimosIngresos] = useState(0)
    const [data, setData] = useState({})
    const [msjError, setMsjError] = useState({
        monto: null,
        descripcion: null,
    })
    const [camposObligatorios] = useState(['monto'])

    useEffect(() => {
        fetchCajaIngresos()
        setData({
            monto: '',
            descripcion: ''
        })
        setMsjError(null)
    }, [])

    const fetchCajaIngresos = async () => {
        try {
            const response = await cajaServices.traerIngresos();
            setMontoTotal(response.total)
            setUltimaSesion(response.ultimaSesion)
            setUltimosIngresos(response.ultimosIngresos)

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const onChangeValue = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const onPressSubmit = () => {
        let errores = []
        let objetoErrores = {}
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
            position: "bottom-right",
            closeOnClick: true,
            theme: "colored",
        })
        try {
            const response = await cajaServices.ingresarMonto(data);
            if (response.status === 200) {
                toast.update(id, {
                    isLoading: false,
                    autoClose: 2000,
                    render: "Proceso finalizado correctamente!",
                    type: "success",
                });
                fetchCajaIngresos();
            } else {
                console.log(response)
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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-emerald-200 p-5 rounded">
                <div className="flex flex-col">
                    <div className="flex flew-row justify-between">
                        <div className="flex items-center">
                            <div className="text-center">
                                <p>Efectivo en Caja</p>
                                <p className="text-4xl">${montoTotal}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 max-w-2xl w-auto">
                        <form action="{{route('store.egresoCaja', $ultimaSesion->id)}}" method="POST">
                            <div className="flex flex-col mb-5 w-52 mt-3">
                                <Input
                                    label="Monto total a ingresar"
                                    labelPlacement='outside'
                                    placeholder="Ingrese el monto a ingresar"
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
                                    label="Descripción motivo de ingreso"
                                    labelPlacement='outside'
                                    placeholder="Escriba el motivo de ingreso de efectivo"
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
                                    color="success"
                                    onPress={onPressSubmit}
                                    isDisabled={isLoading}
                                >
                                    Guardar Ingreso
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <div className="flex items-center mt-6 flex-col max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="my-2 text-left">
                    {/* <p className="text-left">Últimos {{$ultimosIngresos->count()}} registros:</p> */}
                </div>
                <div className='mt-4 p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded shadow-small w-full'>
                    <table className='min-w-full h-auto table-auto w-full' >
                        <thead className='[&>tr]:first:rounded-lg' style={{ textAlign: 'start' }}>
                            <tr className='group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2' style={{ textAlign: 'start' }}>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>ID</th>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>CAJA INICIADA POR</th>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>MONTO INGRESADO</th>
                                <th style={{ backgroundColor: '#999cbe', fontWeight: 'bold', color: 'white' }} className='group px-3 h-10 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg'>DESCRIPCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ultimosIngresos && ultimosIngresos.length !== 0 ?
                                ultimosIngresos.map((ingreso, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'} style={{ textAlign: 'start' }}>                                                  
                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>{ingreso?.id}</p>
                                            </td>
                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>{ingreso?.user?.nombre}</p>
                                            </td>

                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>${ingreso?.monto}</p>
                                            </td>
                                            <td className="py-2 px-3 text-small font-normal text-center">
                                                <p>{ingreso?.descripcion ?? "-"}</p>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr className='text-center'>
                                        <td colSpan="10" className='py-3'>No se registraron ingresos dentro de esta fecha</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

if(document.getElementById('CajaIngresos')) {
    const domNode = document.getElementById('CajaIngresos')
    const root = createRoot(domNode)
    root.render(<CajaIngresos/>)
}
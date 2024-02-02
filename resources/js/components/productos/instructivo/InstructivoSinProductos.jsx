import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";
import { UploadFileIcon } from '../../icons/UploadFileIcon';
import { KeyboardIcon } from '../../icons/KeyboardIcon';
import { urls } from '../../../config/config';

const InstructivoSinProductos = () => {
    
    return (
        <div>
            <div className="my-9" style={{marginTop: 25}}>
                <h2 className="antialiased font-medium tracking-wide text-center" style={{ fontSize: 32 }}>
                    Agrega tus productos a la plataforma.
                </h2>
                <p className='text-center text-descripcion'>
                    Podemos ayudarte a cargar tus productos o podés hacerlo manualmente.
                </p>
            </div>
            <div className='flex justify-center gap-6' style={{marginTop: 60}}>
                <Card className="max-w-[200px]" shadow='sm' isPressable>
                    <CardHeader className="flex gap-2 justify-center" style={{marginBottom: 0}}>
                    <UploadFileIcon size={60} fill="#6f7cf2" />
                    </CardHeader>
                    <CardBody style={{ maxWidth: 440, padding: 15, paddingTop: 0}}>
                        <p className="text-md font-semibold text-center align-top" style={{ fontSize: 24 }}>Subir archivo</p>
                        <p className='font-sans text-center mt-2 text-descripcion'>Suba su archivo Excel, nuestra plataforma lo importa y procesa automáticamente. Simplificamos el proceso para que pueda empezar rápidamente.</p>
                    </CardBody>
                    <CardFooter className="flex gap-3 justify-center" style={{marginBottom: 15}}>
                        <Link
                            href={urls.productos.importarArchivo}
                            className='text-center'
                            
                        >
                            Ver más
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="max-w-[200px]" shadow='sm' isPressable>
                    <CardHeader className="flex gap-2 justify-center" style={{marginBottom: 0}}>
                        <KeyboardIcon size={60} fill="#6f7cf2"/>
                    </CardHeader>
                    <CardBody style={{ maxWidth: 440, padding: 15, paddingTop: 0}}>
                        <p className="text-md font-semibold text-center align-top" style={{ fontSize: 24 }}>Ingresar manualmente</p>
                        <p className='text-center mt-2 text-descripcion'>Ingrese manualmente sus datos en nuestra plataforma. Complete fácilmente los campos requeridos y comience a utilizar nuestros servicios de inmediato.</p>
                    </CardBody>
                    <CardFooter className="flex gap-3 justify-center" style={{marginBottom: 15}}>
                        <Link
                            href={urls.productos.crear}
                            className='text-center'
                            
                        >
                            Ver más
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default InstructivoSinProductos
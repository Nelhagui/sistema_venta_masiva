import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { DownloadFileIcon } from '../../icons/DownloadFileIcon';
import { UploadFileIcon } from '../../icons/UploadFileIcon';
import { KeyboardIcon } from '../../icons/KeyboardIcon';

const InstructivoSinProductos = () => {
    return (
        <div>
            <div className="my-9">
                <h2 class="antialiased font-medium tracking-wide text-center" style={{ fontSize: 32 }}>
                    Agrega tus productos a la plataforma.
                </h2>
                <p className='text-center text-slate-400 mb-6'>
                    Podemos ayudarte a cargar tus productos o podés hacerlo manualmente.
                </p>
            </div>
            <div className='flex justify-center gap-6'>
                <Card className="max-w-[300px]">
                    <CardHeader className="flex gap-3 justify-center">
                        <UploadFileIcon size={60} />
                    </CardHeader>
                    <Divider />
                    <CardBody style={{ maxWidth: 440, padding: 16 }}>
                        <p className="text-md font-semibold text-center" style={{ fontSize: 24 }}>Subir archivo</p>
                        <p className='text-center mt-2'>Suba su archivo Excel, nuestra plataforma lo importa y procesa automáticamente. Simplificamos el proceso para que pueda empezar rápidamente.</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/nextui-org/nextui"
                            anchorIcon={<DownloadFileIcon />}
                        >
                            Excel ejemplo
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="max-w-[200px]">
                    <CardHeader className="flex gap-3 justify-center">
                        <KeyboardIcon size={60} />
                    </CardHeader>
                    <Divider />
                    <CardBody style={{ maxWidth: 440, padding: 16 }}>
                        <p className="text-md font-semibold text-center" style={{ fontSize: 24 }}>Ingresar manualmente</p>
                        <p className='text-center mt-2'>Ingrese manualmente sus datos en nuestra plataforma. Complete fácilmente los campos requeridos y comience a utilizar nuestros servicios de inmediato.</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/nextui-org/nextui"
                        >
                            Visit source code on GitHub.
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default InstructivoSinProductos
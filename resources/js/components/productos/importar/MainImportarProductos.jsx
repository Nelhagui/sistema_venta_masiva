import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, CardBody, Button } from "@nextui-org/react";
import { UploadFileCloud } from '../../icons/UploadFileICloud';
import FileUploader from './FileUploader';

export default function MainImportarProductos() {

    const irPaginaAgregarProducto = () => {
        console.log('hola')
    }
    return (
        <>
            <div className='mt-4'>
                <h1 className='titulo-seccion mb-2'>Vamos a importar el archivo</h1>
                <p className='text-instructivo'>Para importar correctamente sus datos, asegúrese de que su archivo Excel <strong className='text-instructivo-strong'>cumpla con la estructura requerida</strong>. <br /> Descargue nuestro ejemplo de Excel para obtener un formato guía.</p>
            </div>
            <div className="mt-10">
                <Card shadow='sm'>
                    <CardBody
                        style={{ padding: 45 }}
                    >
                        <div className='text-center'>
                            <h3 className='titulo-seccion' style={{fontSize: 25, fontWeight: 500}}>Aún no has cargado ningún archivo</h3>
                            
                            <FileUploader/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

if (document.getElementById('mainImportarProductos')) {
    const domNode = document.getElementById('mainImportarProductos');
    const root = createRoot(domNode);
    root.render(<MainImportarProductos />);
}
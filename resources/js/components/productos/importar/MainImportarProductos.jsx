import { createRoot } from 'react-dom/client';
import { Card, CardBody } from "@nextui-org/react";
import FileUploader from './FileUploader';

export default function MainImportarProductos() {

    return (
        <>
            <div className='mt-4'>
                <h1 className='titulo-seccion mb-2'>Vamos a importar el archivo</h1>
                <p className='text-instructivo'>Para importar correctamente sus datos, asegúrese de que <strong className='text-instructivo-strong'> su archivo Excel cumpla con la estructura requerida</strong>. <br /> Descargue nuestro ejemplo de Excel para obtener un formato guía.</p>
            </div>
            <div className="mt-10">
                <Card shadow='sm'>
                    <CardBody
                        style={{ padding: 45 }}
                    >
                        <div className='text-center'>
                            <FileUploader />
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
import React, { useRef, useState, useEffect } from 'react';
import { Button, Spinner } from "@nextui-org/react";
import { UploadFileCloud } from '../../icons/UploadFileICloud';
import productoServices from '../../../services/productoServices';

const FileUploader = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productosRepetidos, setProductosRepetidos] = useState([]);
    const [productosInvalidos, setProductosInvalidos] = useState([]);
    const [productosValidos, setProductosValidos] = useState(0);
    const [procesoFinalizado, setProcesoFinalizado] = useState(false);
    const [frases, setFrases] = useState([
        "Estamos procesando la información del archivo...",
        "Al finalizar omitiremos productos repetidos y con campos erróneos...",
    ]);
    const [indiceFrase, setIndiceFrase] = useState(0);

    useEffect(() => {
        let intervalId;
        if (isLoading) {
            intervalId = setInterval(() => {
                setIndiceFrase(prevIndice => (prevIndice + 1) % frases.length);
            }, 5000); // Cambia de frase cada 5 segundos
        }

        return () => clearInterval(intervalId);
    }, [isLoading]);

    const inputRef = useRef(null);

    const handleButtonClick = () => {
        setMessage('')
        inputRef.current.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = ['.xlsx'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

        // Validar la extensión del archivo
        const fileExtension = file.name.split('.').pop();
        if (!allowedExtensions.includes('.' + fileExtension)) {
            setMessage('La extensión del archivo debe ser .xlsx');
            return;
        }

        // Validar el tamaño del archivo
        if (file.size > maxSizeInBytes) {
            setMessage('El tamaño del archivo no debe exceder los 5 MB');
            return;
        }

        fetchUploadFileProductos(file);

        // Restablecer el valor del input de tipo archivo para permitir cargar el mismo archivo nuevamente
        event.target.value = null; // Esto restablece el valor del input a null

        setMessage('');
    };

    const fetchUploadFileProductos = async (file) => {
        setIsLoading(true);
        try {
            const response = await productoServices.uploadExcel(file)
            if (response.status === 400) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                // La petición fue exitosa, actualiza los productos
                setProductosRepetidos(response.productos_repetidos);
                setProductosInvalidos(response.productos_invalidos);
                setProductosValidos(response.productos_validos);
                setProcesoFinalizado(true)
            }
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {
                procesoFinalizado
                    ?
                    <>
                        <h3 className='titulo-seccion' style={{ fontSize: 23, fontWeight: 400 }}>Resultado del proceso de carga:</h3>
                        <div className='flex justify-center gap-6' style={{ marginTop: 30 }}>
                            <div>
                                <p className='text-descripcion' style={{ color: 'green' }}>{productosValidos} productos agregados</p>
                            </div>
                            <div>
                                <p className='text-descripcion' style={{ color: 'orange' }}>{productosRepetidos.length} omitidos por repetición</p>
                            </div>
                            <div>
                                <p className='text-descripcion' style={{ color: 'red' }}>{productosInvalidos.length} omitidos por campos erróneos</p>
                            </div>
                        </div>

                    </>
                    :
                    <>
                        {
                            isLoading
                                ? <h3 className='titulo-seccion texto-intermitente' style={{ fontSize: 25, fontWeight: 500 }}>{frases[indiceFrase]}</h3>
                                : <h3 className='titulo-seccion' style={{ fontSize: 25, fontWeight: 500 }}>Aún no has cargado ningún archivo</h3>
                        }
                        <Button
                            className="bg-personalizado text-background max-w-24 px-6 py-6"
                            endContent={!isLoading ? <UploadFileCloud /> : null}
                            isDisabled={isLoading}
                            onPress={handleButtonClick}
                            style={{ maxWidth: 200, marginTop: 30 }}
                        >
                            {
                                isLoading
                                    ? <>
                                        <Spinner color="default" labelColor="foreground" />
                                        Procesando...
                                    </>
                                    : <>Cargar Archivo</>
                            }
                        </Button>
                        <input
                            type="file"
                            id="fileInput"
                            ref={inputRef}
                            style={{ display: 'none' }} // Oculta el input
                            onChange={handleFileUpload}
                        />
                        {message && <p style={{ color: 'red', marginTop: 15 }}>{message}</p>}
                    </>
            }

        </div>
    );
};

export default FileUploader;

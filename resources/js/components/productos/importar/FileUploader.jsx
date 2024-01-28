import React, { useRef, useState } from 'react';
import { Button } from "@nextui-org/react";
import { UploadFileCloud } from '../../icons/UploadFileICloud';
import productoServices from '../../../services/productoServices';

const FileUploader = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            setProductos(response);
            console.log(response)
        } catch (error) {
            // Maneja el error si la creación de la venta falla
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button
                className="bg-personalizado text-background max-w-24"
                // color="primary" 
                endContent={<UploadFileCloud />}
                onPress={handleButtonClick}
                // onClick={handleButtonClick}
                style={{ maxWidth: 200, marginTop: 20 }}
            >
                Cargar archivo
            </Button>
            <input
                type="file"
                id="fileInput"
                ref={inputRef}
                style={{ display: 'none' }} // Oculta el input
                onChange={handleFileUpload}
            />
            {message && <p style={{ color: 'red', marginTop: 5 }}>{message}</p>}
        </div>
    );
};

export default FileUploader;

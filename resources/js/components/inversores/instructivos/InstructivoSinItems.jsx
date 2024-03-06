import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from "@nextui-org/react";
import { UploadFileIcon } from '../../icons/UploadFileIcon';
import { KeyboardIcon } from '../../icons/KeyboardIcon';
import { urls } from '../../../config/config';
import ModalCrearInversor from '../agregar/ModalCrearInversor';

const InstructivoSinItems = () => {
    return (
        <>

            <div>
                <div className="my-9" style={{ marginTop: 25 }}>
                    <h2 className="antialiased font-medium tracking-wide text-center" style={{ fontSize: 32 }}>
                        Todavía no tienes inversores agregados al sistema
                    </h2>
                    <p className='text-center text-descripcion'>
                        Haz click en el siguiente botón para agregar tus inversores.
                    </p>
                </div>
                <div className='flex justify-center gap-6' style={{ marginTop: 60 }}>
                    <div className="mt-10">
                        <div className='d-flex text-center mt-4'>
                            <ModalCrearInversor />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstructivoSinItems
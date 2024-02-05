import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from "@nextui-org/react";
import { UploadFileIcon } from '../../icons/UploadFileIcon';
import { KeyboardIcon } from '../../icons/KeyboardIcon';
import { urls } from '../../../config/config';

const InstructivoSinVentas = () => {
    function irPaginaLector() {
        window.location.href = `${urls.lector.ver}`;
    }
    return (
        <>

            <div style={{marginTop: '40px'}}>
                <div>
                    <h2 className="antialiased font-medium tracking-wide text-center" style={{ fontSize: 37 }}>
                        Sin ventas aún. ¡Haz el primer registro hoy!
                    </h2>
                </div>
                <div className='flex justify-center gap-6'>
                    <div>
                        <div className='d-flex text-center mt-4'>
                            <Button onClick={() => irPaginaLector()}>Comenzar a vender</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstructivoSinVentas
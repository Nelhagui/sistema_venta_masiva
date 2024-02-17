import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NovedadesInstructivos from '../lector/novedades_instructivos/NovedadesInstructivos';

export default function MainHome() {
    const [isLoading, setIsLoading] = useState(true)


    return (
        <>
            {/* <NovedadesInstructivos/> */}
            <p>Bienvenido/a</p>
        </>
    )
}

if (document.getElementById('mainHome')) {
    const domNode = document.getElementById('mainHome');
    const root = createRoot(domNode);
    root.render(<MainHome />);
}
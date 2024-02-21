import { createRoot } from 'react-dom/client';

export default function MainMercadoPago() {
    return (
        <>
            <div>
                Mercadopago
            </div>
        </>
    )
}

if (document.getElementById('MainMercadoPago')) {
    const domNode = document.getElementById('MainMercadoPago');
    const root = createRoot(domNode);
    root.render(<MainMercadoPago />);
}
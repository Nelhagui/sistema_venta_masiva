import { createRoot } from 'react-dom/client';
import TablaListProductosEnBase from './TablaListProductosEnBase';

export default function MainProductosActualizarStock() {
    return (
        <>
            <TablaListProductosEnBase />
        </>
    )
}

if (document.getElementById('MainProductosActualizarStock')) {
    const domNode = document.getElementById('MainProductosActualizarStock');
    const root = createRoot(domNode);
    root.render(<MainProductosActualizarStock />);
}
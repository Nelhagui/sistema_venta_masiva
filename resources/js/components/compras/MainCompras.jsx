import { createRoot } from 'react-dom/client';
import TablaListCompras from './TablaListCompras';

export default function MainCompras() {
   
    return (
        <>
            <TablaListCompras/>
        </>
    )
}

if (document.getElementById('mainCompras')) {
    const domNode = document.getElementById('mainCompras');
    const root = createRoot(domNode);
    root.render(<MainCompras />);
}
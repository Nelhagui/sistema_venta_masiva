import { createRoot } from 'react-dom/client';
import TablaListProductosBase from './TablaListProductosBase';

export default function MainProductosBase() {
    return (
        <>
            <TablaListProductosBase />
        </>
    )
}

if (document.getElementById('mainProductosBase')) {
    const domNode = document.getElementById('mainProductosBase');
    const root = createRoot(domNode);
    root.render(<MainProductosBase />);
}
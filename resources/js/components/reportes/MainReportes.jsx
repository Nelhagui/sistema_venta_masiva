import { createRoot } from 'react-dom/client';
export default function MainReportes() {

    return (
        <h1>Main de Reportes</h1>
    )
}

if(document.getElementById('MainReportes')){
    const domNode = document.getElementById('MainReportes');
    const root = createRoot(domNode);
    root.render(<MainReportes />);
}
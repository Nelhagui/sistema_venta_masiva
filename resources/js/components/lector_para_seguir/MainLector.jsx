import { createRoot } from 'react-dom/client';
import { LectorContextProvider } from '../../context/LectorContext';
import ContainerLector from './ContainerLector';

export default function MainLector() {

    return (
        <ContainerLector />
    )
}

if (document.getElementById('mainLector')) {
    const domNode = document.getElementById('mainLector');
    const root = createRoot(domNode);
    root.render(
        <LectorContextProvider>
            <MainLector />
        </LectorContextProvider>
    );
}
import { createRoot } from 'react-dom/client';
import TablaListCompras from './TablaListCompras';

export default function MainCompras() {
    const [productosIniciales, setProductosIniciales] = useState([])
    const [proveedores, setProveedores] = useState([])
    const [inversores, setInversores] = useState([])
    
    useEffect(() => {
    
        const fetchProveedores = () => {
            return fetch('/api/proveedores').then((response) => {
                if (!response.ok) {
                    throw new Error('Network response for proveedores was not ok');
                }
                return response.json();
            });
        };
    
        const fetchProductos = () => {
            return fetch('/api/productos').then((response) => {
                if (!response.ok) {
                    throw new Error('Network response for productos was not ok');
                }
                return response.json();
            });
        };
    
        const fetchInversores = () => {
            return fetch('/api/inversores').then((response) => {
                if (!response.ok) {
                    throw new Error('Network response for inversores was not ok');
                }
                return response.json();
            });
        };
    
        Promise.all([fetchProveedores(), fetchProductos(), fetchInversores()])
            .then(([proveedoresData, productosData, inversoresData]) => {
                // Actualizar el estado con los datos obtenidos
                setProveedores(proveedoresData);
                setProductosIniciales(productosData);
                setInversores(inversoresData);
                console.log(productosData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                // Actualizar el estado de carga si es necesario
                setIsLoading(false); // Puedes definir este estado si es necesario
            });
    }, []);

    return (
        <>
            <TablaListCompras 
                proveedores={proveedores} 
                inversores={inversores} 
                productosIniciales={productosIniciales}/>
        </>
    )
}

if (document.getElementById('mainCompras')) {
    const domNode = document.getElementById('mainCompras');
    const root = createRoot(domNode);
    root.render(<MainCompras />);
}
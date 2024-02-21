import { createRoot } from 'react-dom/client';

export default function MainMaquetadoLector() {
    return (
        <div className='flex flex-col gap-2'>
            <div className='container-lector'>
                <h1>hola</h1>
            </div>
            <div className='container-opciones flex gap-2'>
                <div style={{ backgroundColor: 'red' }}>desc - aumento</div>
                <div style={{ backgroundColor: 'red' }}>Vuelto</div>
                <div style={{ backgroundColor: 'red' }}>Cliente</div>
            </div>
            <div className='container-resumen'>
                <div>
                    Total
                </div>
                <div className='resumen'>
                    <table>
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Titulo</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                                <th>accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Body content 1</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>Body content 2</td>
                                <td>X</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div className='container-buttons'>
                <h1>hola</h1>
            </div>
        </div>
    )
}

if (document.getElementById('mainMaquetadoLector')) {
    const domNode = document.getElementById('mainMaquetadoLector');
    const root = createRoot(domNode);
    root.render(<MainMaquetadoLector />);
}
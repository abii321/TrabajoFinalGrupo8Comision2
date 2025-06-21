import { App } from '../../App.jsx';
import { Home } from '../pages/Home.jsx';
import  Lista  from '../pages/Lista.jsx';
import { AcercaDe } from '../pages/AcercaDe.jsx';
import { AgregarProducto } from '../pages/AgregarProducto.jsx';
import { Papelera } from "../pages/Papelera";
import { ProductoProvider } from '../context/ProductoContext.jsx';
import { DetalleProducto } from '../pages/DetalleProducto.jsx';
import { EditarProducto } from '../pages/EditarProducto.jsx';
import Favoritos  from '../pages/Favoritos.jsx';


import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
    path: '/',
    element: <App />,
    children: [
        { index: true, element: <Home /> },
        { path: '/lista', element: <Lista /> },
        { path: '/acercade', element: <AcercaDe /> },
        { path: '/agregar', element: <AgregarProducto /> },
        { path: '/producto/:id', element: <DetalleProducto /> },
        { path: '/editar/:id', element: <EditarProducto /> },
        { path: '/favoritos', element: <Favoritos /> },
        { path: '/papelera', element: <Papelera /> }
    ]
    }
]);

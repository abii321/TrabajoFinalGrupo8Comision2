import { App } from '../../App.jsx'
import { Home } from '../pages/Home.jsx'
import { Lista  } from '../pages/Lista.jsx';
import { AcercaDe } from '../pages/AcercaDe.jsx';
import { AgregarProducto } from '../pages/AgregarProducto.jsx';
import { Papelera } from "../pages/Papelera";
import { ProductoProvider } from '../context/ProductoContext.jsx';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter ([
    { 
        path:'/', //Especifica la URL que activa esa ruta 
        element: <App/>, 
        children: [
            { index: true, element: <Home/>}, // equivale al path 
            { path: '/lista', element: <Lista/>},
            { path:'/acercade', element: <AcercaDe/>},
            { path: '/agregar', element: <AgregarProducto /> },
            { path: '/papelera', element: <Papelera /> }
        ]
    }
]);

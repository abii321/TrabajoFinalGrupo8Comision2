import { App } from '../App.jsx'
import { Home } from '../views/Home.jsx'
import { AcercaDe } from '../views/AcercaDe.jsx';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter ([
    { 
        path:'/', //Especifica la URL que activa esa ruta 
        element: <App/>, 
        children: [
            { index: true, element: <Home/>}, // equivale al path 
            { path:'/acercade', element: <AcercaDe/>},
        ]
    }
]);

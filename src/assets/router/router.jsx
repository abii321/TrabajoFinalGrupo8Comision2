import { App } from '../../App.jsx';
import { Home } from '../pages/Home.jsx';
import { Registro } from '../pages/Registro.jsx';
import  Lista  from '../pages/Lista.jsx';
import { Nosotros } from '../pages/Nosotros.jsx';
import { AgregarProducto } from '../pages/AgregarProducto.jsx';
import { Papelera } from "../pages/Papelera";
import { DetalleProducto } from '../pages/DetalleProducto.jsx';
import { EditarProducto } from '../pages/EditarProducto.jsx';
import Favoritos  from '../pages/Favoritos.jsx'; 
import { Error } from '../pages/Error.jsx'


import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([ // Enrutador, observa los cambios en la URL y decide que ruta mostrar 
    {
    path: '/',  //Especifica la URL que activa esa ruta 
    element: <App />, // componente react que se va a renderizar cuando se visite esa ruta 
    children: [ //define rutas hijas, que se rederizan dentro de <Outlet /> del componente padre App 
        { index: true, element: <Home /> }, // equivale al path // index true , indica la ruta por defecto dentro del padre 
        { path: 'registro', element: <Registro/>},
        { path: 'lista', element: <Lista /> },
        { path: 'agregar', element: <AgregarProducto /> },
        { path: 'producto/:id', element: <DetalleProducto /> },
        { path: 'editar/:id', element: <EditarProducto /> },
        { path: 'favoritos', element: <Favoritos /> },
        { path: 'papelera', element: <Papelera /> },
        { path: 'nosotros', element: <Nosotros /> },
        { path: '*', element: <Error/>}
    ]
    }   
]);

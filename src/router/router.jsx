import { App } from '../App.jsx';
import { Home } from '../views/Home.jsx';
import { AcercaDe } from '../views/AcercaDe.jsx';
import { AgregarProducto } from '../views/AgregarProducto.jsx';
import { DetalleProducto } from '../views/DetalleProducto.jsx'; 
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  { 
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/acercade', element: <AcercaDe /> },
      {/**{ path: '/agregar', element: <AgregarProducto /> },
      { path: '/producto/:id', element: <DetalleProducto /> } **/}
    ]
  }
]);

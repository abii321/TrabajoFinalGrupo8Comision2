import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { ProveedorEstado } from './pages/EstadoGlobal'; // Ajustá el path si está en otro lado
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProveedorEstado>
      <RouterProvider router={router} />
    </ProveedorEstado>
  </React.StrictMode>
);

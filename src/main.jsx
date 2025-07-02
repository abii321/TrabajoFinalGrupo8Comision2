import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './assets/router/router.jsx';

import { ProductoProvider } from './assets/context/ProductoContext.jsx';
import { AuthProvider } from './assets/context/AutorizacionesContext.jsx';
import { TemaProvider } from './assets/context/TemaContext.jsx'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductoProvider>
        <TemaProvider> 
          <RouterProvider router={router} />
        </TemaProvider>
      </ProductoProvider>
    </AuthProvider>
  </React.StrictMode>
);

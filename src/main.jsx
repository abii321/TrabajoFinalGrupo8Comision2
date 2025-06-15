import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './assets/router/router.jsx';
import { ProductoProvider } from './assets/context/ProductoContext.jsx'; // 👈
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductoProvider> {/* 💥 Acá envolvés todo el proyecto */}
      <RouterProvider router={router} />
    </ProductoProvider>
  </React.StrictMode>
);


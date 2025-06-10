import { createContext, useEffect, useState } from 'react';

// Creamos el contexto
export const EstadoGlobal = createContext();

// Creamos el proveedor
export const ProveedorEstado = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Traer productos desde la API al iniciar la app
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  // Alternar favorito: si ya está, lo saca; si no, lo agrega
  const alternarFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <EstadoGlobal.Provider value={{ productos, favoritos, alternarFavorito }}>
      {children}
    </EstadoGlobal.Provider>
  );
};  

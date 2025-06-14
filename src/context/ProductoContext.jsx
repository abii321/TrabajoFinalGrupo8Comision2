import { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const ProductoContext = createContext();

// 2. Componente proveedor del contexto
export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [ultimoId, setUltimoId] = useState(1); // ID empieza en 1

  // 3. Función para agregar producto
  const agregarProducto = (producto) => {
    const nuevoProducto = {
      ...producto,
      id: ultimoId // usamos el ID controlado
    };

    console.log("✅ Producto agregado:", nuevoProducto);
    
    setProductos((prev) => [...prev, nuevoProducto]);
    setUltimoId(ultimoId + 1); // incrementamos para el siguiente
  };

  return (
    <ProductoContext.Provider value={{ productos, agregarProducto, ultimoId }}>
      {children}
    </ProductoContext.Provider>
  );
};

// 5. Hook para usar el contexto
export const useProductos = () => {
  return useContext(ProductoContext);
};

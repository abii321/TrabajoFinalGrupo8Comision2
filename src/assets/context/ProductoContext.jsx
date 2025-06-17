import { createContext, useContext, useState, useCallback } from "react";

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [ultimoId, setUltimoId] = useState(1);

  const agregarProducto = useCallback((producto) => {
    const nuevoProducto = {
      ...producto,
      id: ultimoId
    };
    setProductos((prev) => [...prev, nuevoProducto]);
    setUltimoId((prevId) => prevId + 1);
  }, [ultimoId]);

  const eliminarProducto = useCallback((id) => {
    setProductos((prev) => prev.filter(p => p.id !== id));
    setFavoritos((prev) => prev.filter(fid => fid !== id));
  }, []);

  const editarProducto = useCallback((productoActualizado) => {
    setProductos((prev) =>
      prev.map(p => p.id === productoActualizado.id ? productoActualizado : p)
    );
  }, []);

  const toggleFavorito = useCallback((id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  }, []);

  const productosFavoritos = productos.filter(p => favoritos.includes(p.id));

  return (
    <ProductoContext.Provider value={{
      productos,
      agregarProducto,
      eliminarProducto,
      editarProducto,
      toggleFavorito,
      productosFavoritos,
      favoritos,
      ultimoId
    }}>
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => useContext(ProductoContext);

import { createContext, useContext, useState, useCallback } from "react";

const ProductoContext = createContext();
export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [ultimoId, setUltimoId] = useState(1);

  const agregarProducto = useCallback((producto) => {
    const nuevoProducto = {
      ...producto,
      id: ultimoId,
      eliminado: false
    };
    setProductos((prev) => [...prev, nuevoProducto]);
    setUltimoId((prevId) => prevId + 1);
  }, [ultimoId]);

const eliminarProducto = useCallback((id) => {
  setProductos((prev) =>
    prev.map((p) =>
      p.id === id ? { ...p, eliminado: true } : p
    )
  );
  setFavoritos((prev) => prev.filter(fid => fid !== id));
}, []);

const restaurarProducto = useCallback((id) => {
  setProductos((prev) =>
    prev.map((p) =>
      p.id === id ? { ...p, eliminado: false } : p
    )
  );
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
      setProductos, // 🆕
      setUltimoId,  // 🆕
      agregarProducto,
      eliminarProducto,
      editarProducto,
      toggleFavorito,
      productosFavoritos,
      favoritos,
      ultimoId,
      restaurarProducto
    }}>
      {children}
    </ProductoContext.Provider>
  );
};
export const useProductos = () => useContext(ProductoContext);

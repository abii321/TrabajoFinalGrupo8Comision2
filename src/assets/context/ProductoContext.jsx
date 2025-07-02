import { createContext, useContext, useState, useCallback, useMemo } from "react";
import useAuth from "../hooks/useAuth";

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritosPorUsuario, setFavoritosPorUsuario] = useState({});
  const [ultimoId, setUltimoId] = useState(1);

  const { user } = useAuth();
  const username = user?.username;

  const agregarProducto = useCallback((producto) => {
    const nuevoProducto = {
      ...producto,
      id: ultimoId
    };
    setProductos((prev) => [...prev, nuevoProducto]);
    setUltimoId((prevId) => prevId + 1);
  }, [ultimoId]);

  const eliminarProducto = useCallback((id) => {
    setProductos((prev) =>
      prev.map(p => p.id === id ? { ...p, eliminado: true } : p)
    );
    setFavoritosPorUsuario((prev) => {
      const copia = { ...prev };
      for (const user in copia) {
        copia[user] = copia[user].filter(favId => favId !== id);
      }
      return copia;
    });
  }, []);

  const restaurarProducto = useCallback((id) => {
    setProductos((prev) =>
      prev.map(p => p.id === id ? { ...p, eliminado: false } : p)
    );
  }, []);

  const editarProducto = useCallback((productoActualizado) => {
    setProductos((prev) =>
      prev.map(p => p.id === productoActualizado.id ? productoActualizado : p)
    );
  }, []);

  const toggleFavorito = useCallback((id) => {
    if (!username) return;
    setFavoritosPorUsuario((prev) => { //Actualiza el objeto que guarda los favoritos por usuario
      const favs = prev[username] || []; //obtiene los favoritos actuales del user
      const actualizado = favs.includes(id) // decide si agregar o quitar
        ? favs.filter(favId => favId !== id) // si ya estaba, lo quita
        : [...favs, id];                    // si no estaba, lo agrega
      return { ...prev, [username]: actualizado };
    });
  }, [username]);

  const productosVisibles = useMemo(() => productos.filter(p => !p.eliminado), [productos]);
  const productosEliminados = useMemo(() => productos.filter(p => p.eliminado), [productos]);
  const productosFavoritos = useMemo(() => {
    const favoritos = favoritosPorUsuario[username] || [];
    return productosVisibles.filter(p => favoritos.includes(p.id));
  }, [favoritosPorUsuario, productosVisibles, username]);

  return (
    <ProductoContext.Provider value={{
      productos,
      setProductos,
      setUltimoId,
      productos: productosVisibles,
      productosEliminados,
      agregarProducto,
      eliminarProducto,
      restaurarProducto,
      editarProducto,
      toggleFavorito,
      productosFavoritos,
      favoritos: favoritosPorUsuario[username] || [],
      ultimoId
    }}>
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => useContext(ProductoContext);

import { useEffect, useCallback } from "react";
import { useProductos } from "../context/ProductoContext.jsx";

const API_URL = "https://fakestoreapi.com/products";

const useFetchProductos = () => {
  const { setProductos, setUltimoId } = useProductos();

  const fetchProductos = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const productosAdaptados = data.map((item) => ({
        id: item.id,
        nombre: item.title,
        descripcion: item.description,
        precio: item.price,
        categoria: item.category,
        imagen: item.image,
        eliminado: false,
      }));

      setProductos(productosAdaptados);
      setUltimoId(productosAdaptados.length + 1);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  }, [setProductos, setUltimoId]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);
};

export default useFetchProductos;

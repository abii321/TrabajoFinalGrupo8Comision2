import React, { useMemo, useState } from "react";
import { useProductos } from "../context/ProductoContext";
import FiltroFavoritos from "./FiltroFavoritos";
import FavoritosCards from "./FavoritosCards";

const ListadoFavoritos = () => {
  const { productosFavoritos } = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = useMemo(() => {
    const unicas = new Set(productosFavoritos.map((p) => p.categoria));
    return Array.from(unicas);
  }, [productosFavoritos]);

  const productosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === "Todas") return productosFavoritos;
    return productosFavoritos.filter(
      (p) => p.categoria === categoriaSeleccionada
    );
  }, [categoriaSeleccionada, productosFavoritos]);

  return (
    <div>
      <FiltroFavoritos
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      />
      <FavoritosCards productos={productosFiltrados} />
    </div>
  );
};

export default ListadoFavoritos;
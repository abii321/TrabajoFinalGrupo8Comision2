import React, { useState, useMemo } from "react";
import { useProductos } from "../context/ProductoContext.jsx";
import FiltroCategoria from "./FiltroCategoria.jsx";
import FavoritosCards from "./FavoritosCard.jsx";

const ListadoFavoritos = () => {
  const { productosFavoritos } = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = useMemo(() => {
    const unicas = new Set(productosFavoritos.map((p) => p.categoria));
    return ["Todas", ...Array.from(unicas)];
  }, [productosFavoritos]);

  const productosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === "Todas") return productosFavoritos;
    return productosFavoritos.filter(
      (p) => p.categoria === categoriaSeleccionada
    );
  }, [categoriaSeleccionada, productosFavoritos]);

  return (
    <div>
      <FiltroCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      />
      <FavoritosCards productos={productosFiltrados} />
    </div>
  );
};

export default ListadoFavoritos;

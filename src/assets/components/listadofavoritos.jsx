import React, { useState, useMemo } from "react";
import { useProductos } from "../context/ProductoContext.jsx";
import FiltroCategoria from "./FiltroCategoria.jsx";
import FavoritosCards from "./FavoritosCard.jsx";

const ListadoFavoritos = () => {  // Componente para listar los productos favoritos con filtro por categoría 
  const { productosFavoritos } = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = useMemo(() => { // Extraemos las categorías únicas de los productos favoritos
    const unicas = new Set(productosFavoritos.map((p) => p.categoria));
    return ["Todas", ...Array.from(unicas)];
  }, [productosFavoritos]);

  const productosFiltrados = useMemo(() => { // Filtramos los productos favoritos según la categoría seleccionada
    if (categoriaSeleccionada === "Todas") return productosFavoritos;
    return productosFavoritos.filter(
      (p) => p.categoria === categoriaSeleccionada
    );
  }, [categoriaSeleccionada, productosFavoritos]);

  return (
    <div>
      <FiltroCategoria // Componente para filtrar por categoría
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      />
      <FavoritosCards productos={productosFiltrados} /> {/* Componente para mostrar los productos favoritos filtrados */}
    </div>
  );
};

export default ListadoFavoritos;

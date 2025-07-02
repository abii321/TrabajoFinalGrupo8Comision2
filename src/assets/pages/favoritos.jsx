import React from "react";
import ListadoFavoritos from "../components/listadofavoritos.jsx"; //se encargará de mostrar los productos favoritos

const Favoritos = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mis Productos Favoritos ❤️</h2>
      <ListadoFavoritos />
    </div>
  );
};

export default Favoritos;

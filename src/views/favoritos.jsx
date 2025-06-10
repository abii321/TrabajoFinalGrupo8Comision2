import React, { useContext } from 'react';
import { EstadoGlobal } from '../pages/EstadoGlobal';   
import ProductCard from '../components/ProductCard';

const Favoritos = () => {
  const { productos, favoritos } = useContext(EstadoGlobal);
  const productosFavoritos = productos.filter(p => favoritos.includes(p.id));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Productos Favoritos</h2>
      {productosFavoritos.length === 0 ? (
        <p>No tenés productos favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {productosFavoritos.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos; 
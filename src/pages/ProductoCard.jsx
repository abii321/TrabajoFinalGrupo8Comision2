import { useContext } from 'react';
import { EstadoGlobal } from '../context/EstadoGlobal';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  const { favoritos, alternarFavorito } = useContext(EstadoGlobal);

  const esFavorito = favoritos.includes(producto.id);

  return (
    <div className="border p-4 rounded shadow-md flex flex-col justify-between">
      <img
        src={producto.image}
        alt={producto.title}
        className="h-32 object-contain mb-2 mx-auto"
      />
      <h3 className="font-bold text-lg mb-1">{producto.title}</h3>
      <p className="text-gray-600 mb-1">${producto.price}</p>
      <p className="text-sm text-gray-500 mb-2">{producto.category}</p>

      <div className="flex justify-between items-center mt-auto">
        <Link
          to={`/detalle/${producto.id}`}
          className="text-blue-500 hover:underline"
        >
          Ver más detalles
        </Link>

        <button
          onClick={() => alternarFavorito(producto.id)}
          className="text-xl"
          title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {esFavorito ? '💖' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

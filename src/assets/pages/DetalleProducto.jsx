import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import { DetalleProductoCard } from "../components/DetalleProductoCard";

export const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const producto = productos.find((p) => p.id === Number(id));

  return <DetalleProductoCard producto={producto} />;
};
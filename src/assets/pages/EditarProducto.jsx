import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import { EditarProductoCard } from "../components/EditarProductoCard";

export const EditarProducto = () => {
    const { id } = useParams();
    const { productos } = useProductos();

    const producto = productos.find((p) => p.id === Number(id)); // Busca el producto con el id correspondiente dentro de la lista de productos

    return <EditarProductoCard producto={producto} />; // Renderiza el componente de formulario EditarProductoCard y le pasa como prop el producto encontrado
};

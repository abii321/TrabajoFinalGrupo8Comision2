import { Card, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import useAuth from "../hooks/useAuth";

export const DetalleProducto = () => {
  const { id } = useParams();
  const { productos, eliminarProducto } = useProductos();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          Producto no encontrado.
        </div>
        <Button variant="secondary" onClick={() => navigate("/productos")}>
          Volver a la lista
        </Button>
      </Container>
    );
  }

  const handleEliminar = () => {
    if (!isAdmin) return; // Seguridad adicional
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmar) {
      eliminarProducto(producto.id);
      navigate("/productos");
    }
  };

  const handleEditar = () => {
    navigate(`/editar/${producto.id}`);
  };

return (
  <Container className="d-flex justify-content-center mt-5">
    <Card style={{ width: "26rem", backgroundColor: "#fef3f7", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      {producto.imagen && (
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{ maxHeight: "300px", objectFit: "cover" }} />
      )}
      <Card.Body>
        <Card.Title className="text-center mb-3">{producto.nombre}</Card.Title>
        <Card.Text>
          <p><strong>ID:</strong> {producto.id}</p>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
        </Card.Text>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={() => navigate("/lista")}>
            Volver a la lista
          </Button>

          {isAdmin && (
            <>
              <Button variant="primary" onClick={handleEditar}>
                Editar
              </Button>
              <Button variant="danger" onClick={handleEliminar}>
                Eliminar
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  </Container>
  );
};

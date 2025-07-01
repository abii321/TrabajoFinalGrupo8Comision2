import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import useAuth from "../hooks/useAuth";

export const DetalleProducto = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const { productos, toggleFavorito, favoritos } = useProductos(); // Accede a productos y favoritos desde contexto
  const { user } = useAuth(); // Obtiene info del usuario actual
  const navigate = useNavigate();

  const producto = productos.find((p) => p.id === Number(id)); // Busca el producto correspondiente
  const esFavorito = favoritos.includes(producto?.id); // Verifica si el producto está en favoritos

  // Si no se encuentra el producto, muestra alerta
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

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        {/* Imagen del producto */}
        <Col xs={12} md={6} order={{ xs: 1, md: 2 }} className="text-center">
          <Card.Img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              padding: "1rem"
            }}
          />
        </Col>

        {/* Detalles del producto */}
        <Col xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">{producto.nombre}</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {producto.id} <br />
              <strong>Nombre:</strong> {producto.nombre} <br />
              <strong>Precio:</strong> ${producto.precio} <br />
              <strong>Descripción:</strong> {producto.descripcion} <br />
              <strong>Categoría:</strong> {producto.categoria} <br />
            </Card.Text>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between flex-wrap gap-2">
              <Button variant="secondary" onClick={() => navigate("/lista")}>
                Volver a la lista
              </Button>

              {/* Solo muestra botón de favorito si el usuario está logueado */}
              {user && (
                <Button
                  variant={esFavorito ? "danger" : "outline-danger"}
                  onClick={() => toggleFavorito(producto.id)}
                >
                  {esFavorito ? "💖 Quitar de favoritos" : "🤍 Agregar a favoritos"}
                </Button>
              )}
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import useAuth from "../hooks/useAuth";

// Componente funcional que muestra el detalle del producto
export const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const navigate = useNavigate();

  // Busca el producto correspondiente al ID recibido
  const producto = productos.find((p) => p.id === Number(id));

  // Si no se encuentra el producto, muestra un mensaje de error y un botón para volver
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

  // Renderiza el detalle del producto en una card responsiva
  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
      {/* Columna para la imagen del producto */}
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

       {/* Columna para el contenido textual del producto */}
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

            {/* Botón para volver a la lista */}
            <div className="d-flex justify-content-between flex-wrap">
              <Button variant="secondary" onClick={() => navigate("/lista")}>
                Volver a la lista
              </Button>
            </div>
        </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

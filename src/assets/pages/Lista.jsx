import { useProductos } from "../context/ProductoContext";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Lista = () => {
  const { productos, eliminarProducto, toggleFavorito, favoritos } = useProductos();
  const navigate = useNavigate();

  return (
    <Row>
      {productos.map((producto) => (
        <Col md={4} key={producto.id} className="mb-4">
          <Card>
            <Card.Img variant="top" src={producto.imagen} height="200" />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>
                <strong>Precio:</strong> ${producto.precio} <br />
                <strong>Categoría:</strong> {producto.categoria}
              </Card.Text>
              <Button variant="info" onClick={() => navigate(`/detalle/${producto.id}`)}>
                Detalles
              </Button>{' '}
              <Button variant="warning" onClick={() => navigate(`/editar/${producto.id}`)}>
                Editar
              </Button>{' '}
              <Button variant="danger" onClick={() => eliminarProducto(producto.id)}>
                Eliminar
              </Button>{' '}
              <Button variant={favoritos.includes(producto.id) ? "success" : "outline-success"} onClick={() => toggleFavorito(producto.id)}>
                {favoritos.includes(producto.id) ? "💖 Favorito" : "🤍 Fav"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

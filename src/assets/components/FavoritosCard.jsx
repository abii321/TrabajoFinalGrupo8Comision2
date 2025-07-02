import { Card, Row, Col, Button } from "react-bootstrap";
import { useProductos } from "../context/ProductoContext.jsx";

const FavoritosCards = ({ productos }) => {
  const { toggleFavorito } = useProductos();

  if (productos.length === 0) {
    return <p className="text-center mt-4">No tenés productos favoritos 💔</p>;
  }

  return (
    <Row className="lista">
      {productos.map((producto) => (
        <Col md={4} key={producto.id} className="lista-producto">
          <Card>
            <Card.Img variant="top" src={producto.imagen} className="lista-img" />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>
                <strong>Precio:</strong> ${producto.precio}<br />
                <strong>Categoría:</strong> {producto.categoria}
              </Card.Text>
              <Button
                variant="outline-danger"
                onClick={() => toggleFavorito(producto.id)}
              >
                💔 Quitar de favoritos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FavoritosCards;

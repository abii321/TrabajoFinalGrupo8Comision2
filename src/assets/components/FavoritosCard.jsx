// components/FavoritosCards.jsx
import { Card, Row, Col } from "react-bootstrap";
import { useProductos } from "../context/ProductoContext";

export const FavoritosCards = () => {
  const { productosFavoritos } = useProductos();

  if (productosFavoritos.length === 0) {
    return <p className="text-center mt-4">No tenés productos favoritos 💔</p>;
  }

  return (
    <Row>
      {productosFavoritos.map((producto) => (
        <Col md={4} key={producto.id} className="mb-4">
          <Card>
            <Card.Img variant="top" src={producto.imagen} height="200" />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>
                <strong>Precio:</strong> ${producto.precio}<br />
                <strong>Categoría:</strong> {producto.categoria}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

import { useProductos } from "../context/ProductoContext";
import { Card, Row, Col } from "react-bootstrap";

export const Favoritos = () => {
  const { productosFavoritos } = useProductos();

  if (productosFavoritos.length === 0) {
    return <p className="text-center mt-4">No tenés productos favoritos 💔</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Mis productos favoritos</h2>
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
    </div>
  );
};

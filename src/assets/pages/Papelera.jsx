  import { useProductos } from "../context/ProductoContext.jsx";
  import { Button, Card, Row, Col } from "react-bootstrap";
  import { useNavigate } from "react-router-dom";
  export const Papelera = () => {
    const { productosEliminados, restaurarProducto } = useProductos(); 
    const navigate = useNavigate(); 
    if (productosEliminados.length === 0) {
      return <p className="text-center mt-4">La papelera está vacía 🗑</p>;
    }

    return (
      <div className="container mt-4">
        <Button variant="secondary" className="mb-3" onClick={() => navigate("/lista")}> ← Volver a la lista de productos</Button>
        <h2>Papelera de Productos</h2>
        <Row>
          {productosEliminados.map((producto) => (
            <Col md={4} key={producto.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={producto.imagen} height="200" />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${producto.precio} <br />
                    <strong>Categoría:</strong> {producto.categoria}
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => restaurarProducto(producto.id)}
                  >
                    Restaurar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };


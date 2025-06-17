import { useProductos } from "../context/ProductoContext";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Lista = () => {
  const { productos, eliminarProducto, toggleFavorito, favoritos } = useProductos();
  const navigate = useNavigate();
const { user } = useAuth();

  return (
      <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Lista de Productos</h2>
        <Button variant="secondary" onClick={() => navigate("/Papelera")}>
          Ir a Papelera 🗑
        </Button>
      </div>
    <Row>
      {productos.filter(producto => !producto.eliminado).map((producto) => (
        <Col md={4} key={producto.id} className="mb-4">
          <Card>
            <Card.Img variant="top" src={producto.imagen} height="200" />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>
                <strong>Precio:</strong> ${producto.precio} <br />
                <strong>Categoría:</strong> {producto.categoria}
              </Card.Text>
              <Button variant="info" onClick={() => navigate(`/producto/${producto.id}`)}>
                Detalles
              </Button>{' '}
              {user?.rol === "administrativo" && (
                <>
                  <Button variant="warning" onClick={() => navigate(`/editar/${producto.id}`)}>
                    Editar
                  </Button>{' '}
                  <Button variant="danger" onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
                  </Button>{' '}
                </>
              )}
              <Button variant={favoritos.includes(producto.id) ? "success" : "outline-success"} onClick={() => toggleFavorito(producto.id)}>
                {favoritos.includes(producto.id) ? "💖 Favorito" : "🤍 Fav"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

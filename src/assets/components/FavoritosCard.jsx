import { Card, Row, Col, Button } from "react-bootstrap";
import { useProductos } from "../context/ProductoContext.jsx";
import useAuth from "../hooks/useAuth"; 

const FavoritosCards = ({ productos }) => {
  const { toggleFavorito } = useProductos();
  const { user } = useAuth(); // ⚠️ Obtener usuario logueado

  if (productos.length === 0) {
    return <p className="text-center mt-4">No tenés productos favoritos 💔</p>;
  }

  return (
    <div className="lista">
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
              {user && (
               <Button
                variant="outline-danger"
                 onClick={() => toggleFavorito(producto.id)}
                 > 
                 💔 Quitar de favoritos
                  </Button>
)}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default FavoritosCards;

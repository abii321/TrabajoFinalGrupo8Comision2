
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export const DetalleProducto = () => {
  const { id } = useParams();  // obtiene el ID desde la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)  // busca los datos de ese producto
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  if (!producto) return <p className="text-center mt-4">Cargando producto...</p>;

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text><strong>Categoría:</strong> {producto.category}</Card.Text>
          <Card.Text><strong>Descripción:</strong> {producto.description}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${producto.price}</Card.Text>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

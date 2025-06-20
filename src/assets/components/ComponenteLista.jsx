// src/assets/components/ComponenteLista.jsx
import React, { useMemo } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import { useProductos } from "../context/ProductoContext";
import useAuth from "../hooks/useAuth";

const ComponenteLista = () => {
  const { productos, eliminarProducto, toggleFavorito, favoritos } = useProductos();
  const { user } = useAuth();
  const navigate = useNavigate();

  const productosActivos = useMemo(() => {
    return productos.filter(p => !p.eliminado);
  }, [productos]);

  return (
    <Row>
      {productosActivos.map((producto) => (
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
                <FaInfoCircle /> Detalles
              </Button>{' '}
              {user?.rol === "administrativo" && (
                <>
                  <Button variant="warning" onClick={() => navigate(`/editar/${producto.id}`)}>
                    <FaEdit /> Editar
                  </Button>{' '}
                  <Button variant="danger" onClick={() => eliminarProducto(producto.id)}>
                    <FaTrash /> Eliminar
                  </Button>{' '}
                </>
              )}
              <Button
                variant={favoritos.includes(producto.id) ? "success" : "outline-success"}
                onClick={() => toggleFavorito(producto.id)}
              >
                {favoritos.includes(producto.id) ? <FaHeart /> : <FaRegHeart />} Favorito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ComponenteLista;

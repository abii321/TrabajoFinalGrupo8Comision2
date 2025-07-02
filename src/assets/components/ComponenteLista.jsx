import { useMemo, useState, useCallback } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import { useProductos } from "../context/ProductoContext";
import useAuth from "../hooks/useAuth";
import FiltroCategoria from "./FiltroCategoria.jsx";

const ComponenteLista = () => {
  const { productos, eliminarProducto, toggleFavorito, favoritos } = useProductos();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 1. Obtener productos activos
  const productosActivos = useMemo(() => {
    return productos.filter(p => !p.eliminado);
  }, [productos]);

  // 2. Extraer categorías únicas solo de productos activos
  const categorias = useMemo(() => {
    const todas = productosActivos.map(p => p.categoria);
    return [...new Set(todas)];
  }, [productosActivos]);

  // 3. Aplicar filtro por categoría sobre los activos
  const productosFiltrados = useMemo(() => {
    return categoriaSeleccionada === "Todas"
      ? productosActivos
      : productosActivos.filter(p => p.categoria === categoriaSeleccionada);
  }, [productosActivos, categoriaSeleccionada]);

  const manejarCambioCategoria = useCallback((e) => {
    setCategoriaSeleccionada(e.target.value);
  }, []);

  return (
    <>
      <FiltroCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onChange={manejarCambioCategoria}
      />

      <Row className="lista">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id} className="lista-producto">
            <Card>
              <Card.Img variant="top" src={producto.imagen} className="lista-img"/>
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> ${producto.precio} <br />
                  <strong>Categoría:</strong> {producto.categoria}
                </Card.Text>
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
                { (user?.rol === "administrativo" || user?.rol === "usuario-normal") && (
                  <>
                  <Button variant="info" onClick={() => navigate(`/producto/${producto.id}`)}>
                    <FaInfoCircle /> Detalles
                  </Button>{' '}
                  <Button
                    variant={favoritos.includes(producto.id) ? "success" : "outline-success"}
                    onClick={() => toggleFavorito(producto.id)}
                  >
                    {favoritos.includes(producto.id) ? <FaHeart /> : <FaRegHeart />} Favorito
                  </Button> 
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ComponenteLista;

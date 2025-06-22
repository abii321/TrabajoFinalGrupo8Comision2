import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAgregarProducto } from "../hooks/useAgregarProducto.js";
import { useProductos } from "../context/ProductoContext.jsx";
import { useEffect } from "react";

export const AgregarProducto = () => {
  const { formulario, errores, handleChange, handleSubmit, setFormulario } = useAgregarProducto();
  const { productos } = useProductos();

const categoriasUnicas = productos.length > 0 
  ? [...new Set(productos.map(p => p.categoria))]
  : [];

  return (
    <Container>
      <h2 className="text-center my-4">Agregar Producto</h2>
      <Form onSubmit={handleSubmit} className="formulario-agregar">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formulario.id || ""}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                isInvalid={!!errores.nombre}
              />
              <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formulario.precio}
                onChange={handleChange}
                isInvalid={!!errores.precio}
              />
              <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formulario.descripcion}
                onChange={handleChange}
                isInvalid={!!errores.descripcion}
              />
              <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={formulario.categoria}
              onChange={handleChange}
              isInvalid={!!errores.categoria}
            >
              <option value="">Seleccionar categoría</option>
              {categoriasUnicas.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.categoria}
            </Form.Control.Feedback>
          </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formulario.imagen}
                onChange={handleChange}
                isInvalid={!!errores.imagen}
              />
              <Form.Control.Feedback type="invalid">{errores.imagen}</Form.Control.Feedback>
            </Form.Group>
            {formulario.imagen && (
              <div className="text-center mb-3">
                <p>Vista previa de la imagen:</p>
                <img
                  src={formulario.imagen}
                  alt="Vista previa"
                  style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }}
                />
              </div>
            )}
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="secondary" type="submit">Agregar Producto</Button>
        </div>
      </Form>
    </Container>
  );
};
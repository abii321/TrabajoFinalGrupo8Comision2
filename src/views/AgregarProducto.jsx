import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useProductoForm } from "../hooks/useAgregarProducto";

export const AgregarProducto = () => {
  const { formulario, errores, handleChange, handleSubmit } = useProductoForm();

  return (
    <Container>
      <h2>Agregar Producto</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="formulario-agregar">

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
              <Form.Control
                type="text"
                name="categoria"
                value={formulario.categoria}
                onChange={handleChange}
                isInvalid={!!errores.categoria}
              />
              <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
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

            <Button variant="secondary" type="submit">Agregar Producto</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

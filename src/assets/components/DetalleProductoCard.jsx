import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const DetalleProductoCard = ({ producto }) => {
    if (!producto) {
        return (
        <Container className="mt-5">
            <div className="alert alert-danger">Producto no encontrado.</div>
            <Button variant="secondary" onClick={() => window.history.back()}>
                Volver a la lista
            </Button>
        </Container>
        );
    }

    return (
        <Container className="mt-5">
        <Row className="justify-content-center align-items-center">
            <Col xs={12} md={6} order={{ xs: 1, md: 2 }} className="text-center">
            <Card.Img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    padding: "1rem",
                }}
            />
        </Col>
        <Col xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">{producto.nombre}</Card.Title>
                <Card.Text>
                    <strong>ID:</strong> {producto.id} <br />
                    <strong>Nombre:</strong> {producto.nombre} <br />
                    <strong>Precio:</strong> ${producto.precio} <br />
                    <strong>Descripción:</strong> {producto.descripcion} <br />
                    <strong>Categoría:</strong> {producto.categoria} <br />
                </Card.Text>
                <Button variant="secondary" onClick={() => window.history.back()}>
                    Volver a la lista
                </Button>
            </Card.Body>
        </Col>
        </Row>
    </Container>
    );
};

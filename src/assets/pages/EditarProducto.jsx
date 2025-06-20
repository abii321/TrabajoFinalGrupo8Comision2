// src/pages/EditarProducto.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";

export const EditarProducto = () => {
    const { id } = useParams();
    const { productos, editarProducto } = useProductos();
    const navigate = useNavigate();

    const producto = productos.find((p) => p.id === Number(id));

    const [form, setForm] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    imagen: ""
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
    if (producto) {
        setForm({ ...producto });
    }
    }, [producto]);

const validar = () => {
    //se crea un objeto vacío para guardar los errores encontrados
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!form.categoria.trim()) nuevosErrores.categoria = "La categoría es obligatoria.";
    if (!form.precio || isNaN(form.precio)) nuevosErrores.precio = "El precio debe ser un número.";
    if (!form.imagen.trim()) nuevosErrores.imagen = "Debe proporcionar una URL de imagen.";

    //se guardan los errores detectados en el estado
    setErrores(nuevosErrores);
    // Si el objeto está vacío, entonces no hubo errores: retornamos true
    // Si tiene alguna clave (por ejemplo, nombre o precio), retornamos false
    return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
        editarProducto({
        ...form,
        precio: Number(form.precio)
        });
        navigate("/lista");
    }
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    };

    if (!producto) {
    return (
        <Container className="mt-5">
        <Alert variant="danger">Producto no encontrado.</Alert>
        <Button variant="secondary" onClick={() => navigate("/lista")}>Volver a la lista</Button>
        </Container>
    );
    }

    return (
    <Container className="mt-5">
        <h2 className="text-center mb-4">Editar Producto</h2>
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={form.id} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                type="text"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                isInvalid={!!errores.categoria}
                />
                <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                as="textarea"
                name="descripcion"
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
                isInvalid={!!errores.descripcion}
                />
                <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                isInvalid={!!errores.precio}
                />
                <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                type="text"
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                isInvalid={!!errores.imagen}
                />
                <Form.Control.Feedback type="invalid">{errores.imagen}</Form.Control.Feedback>
            </Form.Group>
            </Col>
        </Row>

        <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
            Guardar Cambios
            </Button>
            <Button variant="secondary" className="ms-2" onClick={() => navigate("/lista")}>
            Cancelar
            </Button>
        </div>
        </Form>
    </Container>
    );
};

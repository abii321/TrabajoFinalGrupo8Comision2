import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export const EditarProductoCard = ({ producto, editarProducto, navigate, productos }) => {
    const [form, setForm] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        imagen: ""
    });

    // Estado para mensajes de error por campo
    const [errores, setErrores] = useState({});

    // Llenar el formulario con los datos del producto al cargar
    useEffect(() => {
        if (producto) {
        setForm({ ...producto });
    }
    }, [producto]);

    // Extraer categorías únicas
    const categoriasUnicas = productos.length > 0 
        ? [...new Set(productos.map(p => p.categoria))]
        : [];

    // Función de validación de campos
    const validar = () => {
        const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!form.categoria.trim()) nuevosErrores.categoria = "La categoría es obligatoria.";
    if (!form.precio || isNaN(form.precio) || Number(form.precio) < 0) {
        nuevosErrores.precio = "El precio debe ser un número positivo.";
    }

    const urlValida = (url) =>
        /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp)$/i.test(url.trim());

    if (!form.imagen.trim()) {
        nuevosErrores.imagen = "Debe proporcionar una URL de imagen.";
    } else if (!urlValida(form.imagen)) {
        nuevosErrores.imagen = "La URL debe ser válida y terminar en .jpg, .jpeg, .png, .gif o .webp.";
    }

    setErrores(nuevosErrores);
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

    // Renderizado del formulario
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
                <Form.Select
                name="categoria"
                value={form.categoria}
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

            {form.imagen && (
                <div className="text-center mb-3">
                    <p>Vista previa de la imagen:</p>
                    <img
                        src={form.imagen}
                        alt="Vista previa"
                        style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }}
                    />
                </div>
            )}
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

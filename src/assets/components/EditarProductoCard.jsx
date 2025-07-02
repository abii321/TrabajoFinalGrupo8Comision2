import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext.jsx";
import { useState, useEffect } from "react";

export const EditarProductoCard = () => {
    const { id } = useParams(); // Obtiene el ID del producto desde la URL
    const { productos, editarProducto } = useProductos(); // Accede a los productos y función para editar
    const producto = productos.find((p) => p.id === Number(id)); // Busca el producto correspondiente

  // Estados locales para formulario y errores
    const [formulario, setFormulario] = useState({});
    const [errores, setErrores] = useState({});

  // Crea lista de categorías únicas para el select
    const categoriasUnicas = productos.length > 0 
        ? [...new Set(productos.map((p) => p.categoria))] 
        : [];

  // Al montar el componente, carga los datos del producto al formulario
    useEffect(() => {
        if (producto) {
            setFormulario(producto);
        }
    }, [producto]);

  // Función para manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

  // Validaciones básicas de formulario
    const validar = () => {
        const nuevosErrores = {};

    if (!formulario.nombre?.trim()) {
        nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formulario.precio) {
        nuevosErrores.precio = "El precio es obligatorio";
    } else if (isNaN(formulario.precio) || Number(formulario.precio) <= 0) {
        nuevosErrores.precio = "El precio debe ser un número positivo";
    }

    if (!formulario.descripcion?.trim()) {
        nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (!formulario.categoria?.trim()) {
        nuevosErrores.categoria = "Debe seleccionar una categoría";
    }

    // Validación de URL de imagen usando expresión regular
    const urlValida = /^(http|https):\/\/[^ "]+$/;
    if (!formulario.imagen?.trim()) {
        nuevosErrores.imagen = "Debe proporcionar una URL de imagen";
    } else if (!urlValida.test(formulario.imagen)) {
        nuevosErrores.imagen = "La URL de la imagen no es válida";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
    };

  // Manejador del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            editarProducto(formulario); // Llama al contexto para guardar los cambios
            alert("Producto editado correctamente");
        }
    };

    if (!producto) {
        return <p className="text-center text-danger">Producto no encontrado.</p>;
    }

    return (
    <Container>
        <h2 className="text-center my-4">Editar Producto</h2>
        <Form onSubmit={handleSubmit} className="formulario-editar">
        <Row>
            <Col md={6}>
                {/* Campo de solo lectura para el ID */}
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        value={formulario.id || ""}
                        readOnly
                    />
                </Form.Group>

                {/* Campo para nombre del producto */}
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Campo para precio */}
                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        name="precio"
                        value={formulario.precio}
                        onChange={handleChange}
                        isInvalid={!!errores.precio}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.precio}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Col md={6}>
              {/* Campo para descripción */}
                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            value={formulario.descripcion}
                            onChange={handleChange}
                            isInvalid={!!errores.descripcion}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errores.descripcion}
                    </Form.Control.Feedback>
                </Form.Group>

            {/* Selector de categoría */}
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

                {/* Campo de URL de imagen */}
                <Form.Group className="mb-3">
                    <Form.Label>URL de Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="imagen"
                        value={formulario.imagen}
                        onChange={handleChange}
                        isInvalid={!!errores.imagen}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.imagen}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Vista previa de imagen si hay URL */}
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
            <Button variant="secondary" type="submit">Guardar Cambios</Button>
        </div>
        </Form>
    </Container>
    );
};

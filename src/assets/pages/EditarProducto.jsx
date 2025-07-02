import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import { useEffect, useState } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { EditarProductoCard } from "../components/EditarProductoCard";

export const EditarProducto = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const { productos, editarProducto } = useProductos(); // Acceder al contexto de productos
    const navigate = useNavigate();

    const producto = productos.find((p) => p.id === Number(id));

    // Si no se encuentra el producto, mostrar mensaje de error
    if (!producto) {
        return (
            <Container className="mt-5">
            <Alert variant="danger">Producto no encontrado.</Alert>
            <Button variant="secondary" onClick={() => navigate("/lista")}>Volver a la lista</Button>
        </Container>
    );
    }

    // Renderizar el componente EditarProductoCard, pasando props necesarias
    return (
        <EditarProductoCard producto={producto} editarProducto={editarProducto} navigate={navigate} productos={productos} />
    );
};

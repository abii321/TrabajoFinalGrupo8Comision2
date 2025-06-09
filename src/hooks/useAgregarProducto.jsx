import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";

// Hook para manejar el formulario de agregar producto
export const useAgregarProducto = () => {
  const navigate = useNavigate();
  const { agregarProducto } = useProductos();

  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    imagen: ""
  });

  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!formulario.precio || isNaN(formulario.precio)) nuevosErrores.precio = "El precio debe ser un número válido.";
    if (!formulario.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!formulario.categoria.trim()) nuevosErrores.categoria = "La categoría es obligatoria.";
    if (!formulario.imagen.trim()) nuevosErrores.imagen = "La URL de la imagen es obligatoria.";

    return nuevosErrores;
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validaciones = validarCampos();

    if (Object.keys(validaciones).length > 0) {
      setErrores(validaciones);
      return;
    }

    agregarProducto(formulario);
    navigate("/"); // Redirige al inicio o lista
  };

  return {
    formulario,
    errores,
    handleChange,
    handleSubmit
  };
};

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductoContext.jsx";

export const useAgregarProducto = () => {
  const navigate = useNavigate();
  const { agregarProducto, ultimoId } = useProductos();
  const [errores, setErrores] = useState({});

  const [formulario, setFormulario] = useState({
    id: ultimoId,
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    imagen: ""
  });

  useEffect(() => {
    setFormulario((prev) => ({ ...prev, id: ultimoId }));
  }, [ultimoId]);

  const validarCampos = useCallback(() => {
    const nuevosErrores = {};
    if (!formulario.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!formulario.precio || isNaN(formulario.precio)) nuevosErrores.precio = "El precio debe ser un número válido.";
    if (!formulario.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!formulario.categoria.trim()) nuevosErrores.categoria = "La categoría es obligatoria.";
    if (!formulario.imagen.trim()) nuevosErrores.imagen = "La URL de la imagen es obligatoria.";
    return nuevosErrores;
  }, [formulario]);

  const handleChange = useCallback((e) => {
    setFormulario((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (errores[e.target.name]) {
      setErrores((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  }, [errores]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const validaciones = validarCampos();
    if (Object.keys(validaciones).length > 0) {
      setErrores(validaciones);
      return;
    }

    agregarProducto(formulario);
    navigate("/");
  }, [formulario, validarCampos, agregarProducto, navigate]);

  return {
    formulario,
    setFormulario,
    errores,
    handleChange,
    handleSubmit
  };
};

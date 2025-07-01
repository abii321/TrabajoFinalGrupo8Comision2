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

  // Actualiza el ID automáticamente si cambia desde el contexto
  useEffect(() => {
    setFormulario((prev) => ({ ...prev, id: ultimoId }));
  }, [ultimoId]);

  // Verifica si la imagen existe realmente
  const validarImagenURL = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Validaciones con lógica completa
  const validarCampos = useCallback(async () => {
    const nuevosErrores = {};

    // Validar nombre (no vacío y sin números)
    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (/\d/.test(formulario.nombre)) {
      nuevosErrores.nombre = "El nombre no debe contener números.";
    }

    // Validar precio
    if (!formulario.precio || isNaN(formulario.precio)) {
      nuevosErrores.precio = "El precio debe ser un número válido.";
    } else if (parseFloat(formulario.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor que 0.";
    }

    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    }

    if (!formulario.categoria.trim()) {
      nuevosErrores.categoria = "La categoría es obligatoria.";
    }

    if (!formulario.imagen.trim()) {
      nuevosErrores.imagen = "La URL de la imagen es obligatoria.";
    } else {
      const imagenExiste = await validarImagenURL(formulario.imagen);
      if (!imagenExiste) {
        nuevosErrores.imagen = "La imagen no se puede cargar o no existe.";
      }
    }

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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const validaciones = await validarCampos();
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

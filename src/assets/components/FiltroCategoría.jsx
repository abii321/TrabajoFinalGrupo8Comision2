import React from "react";
import { Form } from "react-bootstrap";

const FiltroCategoria = ({ categorias, categoriaSeleccionada, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Filtrar por Categoría</Form.Label>
      <Form.Select value={categoriaSeleccionada} onChange={onChange}>
        <option value="Todas">Todas</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default FiltroCategoria;

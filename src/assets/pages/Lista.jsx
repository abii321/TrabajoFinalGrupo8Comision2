// src/assets/pages/Lista.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ComponenteLista from "../components/ComponenteLista";

const Lista = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Lista de Productos</h2>
        <Button variant="secondary" onClick={() => navigate("/Papelera")}>
          Ir a Papelera
        </Button>
      </div>
      <ComponenteLista />
    </>
  );
};

export default Lista;

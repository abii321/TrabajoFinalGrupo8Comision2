// src/assets/pages/Lista.jsx
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ComponenteLista from "../components/ComponenteLista";
import useAuth from '../hooks/useAuth.js'

const Lista = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="pag-lista">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Lista de Productos</h2>
        
        { (user?.rol==="administrativo" || user?.rol==="usuario-normal") &&
          <Button variant="secondary" onClick={() => navigate("/papelera")}>
            Ir a Papelera
          </Button>
        }
      </div>
      <ComponenteLista/>
    </div>
  );
};

export default Lista;

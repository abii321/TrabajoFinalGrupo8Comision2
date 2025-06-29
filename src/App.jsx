import { Link, Outlet, useNavigate } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from "./assets/hooks/useAuth";
import ProtectorRutas from "./assets/components/ProtectorRutas";
import useFetchProductos from "./assets/hooks/useFetchProductos";

export const App = () => {

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

   useFetchProductos();
 
  const manejarLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header>
        <h1>Gestion de Productos</h1>
        <Navbar className="nav-bar">
          <Container>
            <Nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', color: 'white' }}>
              <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Link reemplaza al <a> tradicional y no recarga la pagina*/}

              <ProtectorRutas allowedRoles={['administrativo']}>
                <Nav.Link as={Link} to="/lista">Lista de Productos</Nav.Link>
                <Nav.Link as={Link} to="/agregar">Agregar Producto</Nav.Link>
                {/**<Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link> **/}
              </ProtectorRutas>

              <ProtectorRutas allowedRoles={['alumno']}>
                <Nav.Link as={Link} to="/lista">Lista de Productos</Nav.Link>
                <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
              </ProtectorRutas>

              <Nav.Link as={Link} to="/nosotros">Nosotras</Nav.Link>
              {isAuthenticated && (
                <Button variant="outline-success" onClick={manejarLogout}>Cerrar Sesión</Button>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <Outlet /> {/* Aquí se insertan las rutas hijas */}
      </main>

      <footer>
        <p>© 2025 Grupo 8. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};
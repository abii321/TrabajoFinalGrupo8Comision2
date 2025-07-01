import { Link, Outlet, useNavigate } from "react-router-dom";
import { Container, Button, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from "./assets/hooks/useAuth";
import ProtectorRutas from "./assets/components/ProtectorRutas";
import useFetchProductos from "./assets/hooks/useFetchProductos";

export const App = () => {
  const { user, isAuthenticated, logout } = useAuth(); // custom hook que consume el contexto de autenticacion
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
        <Navbar className="nav-bar barra-nav">
          <Container>
            <Nav className="barra-nav-sub">
              {/* Link reemplaza al <a> tradicional y no recarga la pagina*/}
              {!isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/registro">Registro de usuario</Nav.Link>
                </>
              )}

              <Nav.Link as={Link} to="/lista">Lista de Productos</Nav.Link>

              <ProtectorRutas allowedRoles={['administrativo']}>
                <Nav.Link as={Link} to="/agregar">Agregar Producto</Nav.Link>
                <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
              </ProtectorRutas>

              <ProtectorRutas allowedRoles={['usuario-normal']}>
                <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
              </ProtectorRutas>

              <Nav.Link as={Link} to="/nosotros">Nosotras</Nav.Link>
            
              {isAuthenticated && (
                <NavDropdown title="Usuario" id="basic-nav-dropdown">
                  <NavDropdown.Item>{user.username}</NavDropdown.Item>
                  <NavDropdown.Item><Button className="button" onClick={manejarLogout}>Cerrar Sesión</Button></NavDropdown.Item>
                </NavDropdown>
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
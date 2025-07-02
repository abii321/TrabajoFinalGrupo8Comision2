import { Link, Outlet, useNavigate } from "react-router-dom";
import { Container, Button, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import useAuth from "./assets/hooks/useAuth";
import ProtectorRutas from "./assets/components/ProtectorRutas";
import useFetchProductos from "./assets/hooks/useFetchProductos";
import { useTema } from "./assets/context/TemaContext.jsx";

export const App = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { modoOscuro, toggleTema } = useTema();
  const navigate = useNavigate();

  useFetchProductos();

  const manejarLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header>
        {/* Usamos un div para contener el título y el botón y alinearlos */}
        {/* Aplicamos clases de Bootstrap d-flex para flexbox, justify-content-between para distribuir y align-items-center para centrar verticalmente */}
        <div className="d-flex justify-content-between align-items-center p-3"> {/* Agregamos p-3 para un poco de padding alrededor */}
          <h1>Gestión de Productos</h1> {/* El h1 ahora solo contiene el texto */}
          <Button // El botón se mueve fuera del h1, como un hermano directo del h1 dentro del div
            variant={modoOscuro ? "light" : "dark"}
            onClick={toggleTema}
            size="sm"
          >
            {modoOscuro ? "☀️ Claro" : "🌙 Oscuro"}
          </Button>
        </div>
        
        <Navbar className="nav-bar barra-nav">
          <Container>
            <Nav className="barra-nav-sub">
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
                  <NavDropdown.Item>
                    <Button className="button" onClick={manejarLogout}>Cerrar Sesión</Button>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2025 Grupo 8. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};
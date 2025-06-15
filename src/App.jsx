import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const App = () => {
    return (
        <>
          <header>
            <h1>Gestion de Productos</h1>
            <Navbar className="nav-bar">
              <Container>
                <Nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', color:'white'}}>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  {/**<Nav.Link>Favoritos</Nav.Link> **/}
                  <Nav.Link as={Link} to="/agregar">Agregar Producto</Nav.Link>
                  <Nav.Link as={Link} to="/acercade">Acerca de</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
            </header>

            <main>
                <Outlet/> {/*Aqui se insertan las rutas hijas*/}
            </main>

            <footer>
              <p>© 2025 Grupo 8. Todos los derechos reservados.</p>
              {/**<p>Contacto: <a href="grupo8@gmail.com">grupo8@gmail.com</a></p>
              <div>
                <a href="#">Política de privacidad</a> |
                <a href="#">Términos y condiciones</a>
              </div>**/}
            </footer>
        </>
    );
}
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
                  {/**<Nav.Link as={Link} to="/agregar">Agregar Producto</Nav.Link>**/}
                  <Nav.Link as={Link} to="/acercade">Acerca de</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
            </header>

            <main>
                <Outlet/> {/*Aqui se insertan las rutas hijas*/}
            </main>

            <footer>
                <p>2025 Gestion de Productos</p>
            </footer>
        </>
    );
}
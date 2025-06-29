import Carousel from 'react-bootstrap/Carousel';

export const Principal = () => {
    return (
    <Carousel style={{ width: '60%'}} >
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen1.jpg'
        />
        <Carousel.Caption>
          <h3>Inicio</h3>
          <p>Bienvenido/a al Sistema de Gestión de Productos</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen5.jpg'
        />
        <Carousel.Caption>
          <h3>Gestión completa de productos</h3>
          <p>Añadí, editá o eliminá productos de forma sencilla.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen7.jpg'
        />
        <Carousel.Caption>
          <h3>Favoritos personalizados</h3>
          <p>Marcá tus productos preferidos y accedé a ellos rápido.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen8.jpg'
          style={{ objectFit: 'cover', height: 'auto'}}
        />
        <Carousel.Caption>
          <h3>Roles definidos</h3>
          <p>Acceso diferenciado para administradores y clientes.</p>
        </Carousel.Caption>
      </Carousel.Item>

        <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen6.jpg'
          style={{ objectFit: 'cover', height: 'auto'}}
        />
        <Carousel.Caption>
          <h3>Control total para administradores</h3>
          <p>Los administradores gestionan todos los productos y usuarios.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}
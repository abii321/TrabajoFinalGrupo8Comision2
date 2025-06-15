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
          <h3>Funcionalidad 1</h3>
          <p>Agregar, editar y consultar información detallada de los productos.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen7.jpg'
        />
        <Carousel.Caption>
          <h3>Funcionalidad 2</h3>
          <p>Gestionar fácilmente los productos desde un solo lugar.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen8.jpg'
          style={{ objectFit: 'cover', height: 'auto'}}
        />
        <Carousel.Caption>
          <h3>Funcionalidad 3</h3>
          <p>Navegar por las secciones para acceder a las funcionalidades</p>
        </Carousel.Caption>
      </Carousel.Item>

        <Carousel.Item>
        <img
          className="d-block w-100"
          src='/public/principal/imagen6.jpg'
          style={{ objectFit: 'cover', height: 'auto'}}
        />
        <Carousel.Caption>
          <h3>Funcionalidad 4</h3>
          <p>Navegar por las secciones para acceder a las funcionalidades</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}
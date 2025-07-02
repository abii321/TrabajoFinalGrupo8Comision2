import { Card, Container } from "react-bootstrap"

export const Nosotros = () => {
    const alumnos = [
        {nombre: "Cansino Celeste Lujan", git: "lujancansino", correo:"lujancansinooli09@gmail.com", escuela: "Escuela de Minas", link:"https://github.com/lujancansino"},
        {nombre: "Orellana Ariana", git: "orellanaariana", correo:"ariorellana07@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/orellanaariana"},
        {nombre: "Rodriguez Sofia Victoria", git: "soffiro", correo:"sofiarodriguez07v@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/soffiro"},
        {nombre: "Tarifa Abril Lucero", git: "altarifa", correo:"abrillucerotarifa@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/altarifa"},
        {nombre: "Teran Luciana Abigail", git: "abii321", correo:"abigail.teran321@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/abii321"}
    ];


    return (
        <div>
            <h2>Contacto</h2>
            <Container className="nosotros-container">
            { alumnos.map( a=> {
                return (
                    <Card key={a.git} className="nosotros-card">
                        <a href={a.link} target="_blank" rel="noopener noreferrer">
                            <Card.Img variant="top" src={`${a.link}.png`} className="nosotros-card-img"/>
                        </a>
                        <Card.Body style={{textAlign:'center'}}>
                            <Card.Title>{a.nombre}</Card.Title>
                            <Card.Text>
                                GitHub: {a.git} <br/>
                                Correo: {a.correo} <br/>
                                Institucion Academica: {a.escuela}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            } ) } 
            </Container>
            
        </div>
    )
}
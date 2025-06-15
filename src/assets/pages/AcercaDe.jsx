import { Card, Button, Container } from "react-bootstrap"

export const AcercaDe = () => {
    const alumnos = [
        {nombre: "Cansino Lujan", git: "lujancansino", correo:"lujancansinooli09@gmail.com", escuela: "Escuela de Minas", link:"/public/creators/programmer.png"},
        {nombre: "Orellana Ariana", git: "orellanaariana", correo:"ariorellana07@gmail.com", escuela: "Escuela de Minas",  link:"/public/creators/programmer.png"},
        {nombre: "Rodriguez Sofia Victoria", git: "soffiro", correo:"sofiarodriguez07v@gmail.com", escuela: "Escuela de Minas",  link:"/public/creators/programmer.png"},
        {nombre: "Tarifa Abril Lucero", git: "altarifa", correo:"abrillucerotarifa@gmail.com", escuela: "Escuela de Minas",  link:"/public/creators/programmer.png"},
        {nombre: "Teran Luciana Abigail", git: "abii321", correo:"abigail.teran321@gmail.com", escuela: "Escuela de Minas",  link:"/public/creators/programmer.png"}
    ];


    return (
        <div>
            <h2>Contacto</h2>
            <Container style={{display:'flex', flexWrap:'wrap', gap:'3px'}}>
            { alumnos.map( a=> {
                return (
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src={a.link} />
                        <Card.Body style={{textAlign:'center'}}>
                            <Card.Title>{a.nombre}</Card.Title>
                            <Card.Text>
                                <p>User en GitHub: {a.git}</p>
                                <p>Correo: {a.correo}</p>
                                <p>Institucion Academica: {a.escuela} </p>
                                
                            </Card.Text>
                            <Button variant="primary">Mas informacion</Button>
                        </Card.Body>
                    </Card>
                )
            } ) } 
            </Container>
            
        </div>
    )
}
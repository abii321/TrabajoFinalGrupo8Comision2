import { Card, Button, Container } from "react-bootstrap"

export const AcercaDe = () => {
    const alumnos = [
        {nombre: "Cansino Lujan", escuela:"Escuela de Minas", git: "lujancansino", link:"/public/creators/programmer.png"},
        {nombre: "Orellana Ariana", escuela:"Escuela de Minas", git: "orellanaariana", link:"/public/creators/programmer.png"},
        {nombre: "Rodriguez Sofia Victoria", escuela:"Escuela de Minas", git: "soffiro", link:"/public/creators/programmer.png"},
        {nombre: "Tarifa Abril Lucero", escuela:"Escuela de Minas", git: "altarifa", link:"/public/creators/programmer.png"},
        {nombre: "Teran Luciana Abigail", escuela:"Escuela de Minas", git: "abii321", link:"/public/creators/programmer.png"}
    ];


    return (
        <div>
            <h2>Contacto</h2>
            <Container style={{display:'flex', flexWrap:'wrap', gap:'5px'}}>
            { alumnos.map( a=> {
                return (
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={a.link} />
                        <Card.Body style={{textAlign:'center'}}>
                            <Card.Title>{a.nombre}</Card.Title>
                            <Card.Text>
                                <p>Escuela: {a.escuela} </p>
                                <p>User en GitHub: {a.git}</p>
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
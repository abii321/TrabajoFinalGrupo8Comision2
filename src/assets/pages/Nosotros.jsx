import { Card, Button, Container } from "react-bootstrap"
import { BiBorderRadius } from "react-icons/bi";

export const Nosotros = () => {
    const alumnos = [
        {nombre: "Cansino Lujan", git: "lujancansino", correo:"lujancansinooli09@gmail.com", escuela: "Escuela de Minas", link:"https://github.com/lujancansino"},
        {nombre: "Orellana Ariana", git: "orellanaariana", correo:"ariorellana07@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/orellanaariana"},
        {nombre: "Rodriguez Sofia Victoria", git: "soffiro", correo:"sofiarodriguez07v@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/soffiro"},
        {nombre: "Tarifa Abril Lucero", git: "altarifa", correo:"abrillucerotarifa@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/altarifa"},
        {nombre: "Teran Luciana Abigail", git: "abii321", correo:"abigail.teran321@gmail.com", escuela: "Escuela de Minas",  link:"https://github.com/abii321"}
    ];


    return (
        <div>
            <h2>Contacto</h2>
            <Container style={{display:'flex', flexWrap:'wrap', gap:'3px'}}>
            { alumnos.map( a=> {
                return (
                    <Card style={{ width: '16rem' }}>
                        <a href={a.link} target="_blank" rel="noopener noreferrer">
                            {/*<Card.Img variant="top" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />*/}
                            <Card.Img variant="top" src={`${a.link}.png`} style={{borderRadius:'50%'}}/>
                        </a>
                        <Card.Body style={{textAlign:'center'}}>
                            <Card.Title>{a.nombre}</Card.Title>
                            <Card.Text>
                                <p>GitHub: {a.git}</p>
                                <p>Correo: {a.correo}</p>
                                <p>Institucion Academica: {a.escuela} </p>
                                
                            </Card.Text>
                            {/*<Button variant="primary">Mas informacion</Button>*/}
                        </Card.Body>
                    </Card>
                )
            } ) } 
            </Container>
            
        </div>
    )
}
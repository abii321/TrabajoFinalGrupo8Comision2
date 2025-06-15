import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form, Container, Button } from 'react-bootstrap';

export const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ passwd, setPasswd ] = useState('');
    const [ loginError, setLoginError ] = useState('');

    const { login, isAuthenticated, user } = useAuth();
    const navigate= useNavigate();

    useEffect( () => {
        if(isAuthenticated){
            if( user?.rol === 'administrativo'){
                navigate('/lista', {replace: true});
            }
            else if(user?.rol === 'alumno'){
                navigate('/lista', {replace: true});
            }
            else {
                navigate('/home', {replace: true});
            }
        }
    }, [isAuthenticated, navigate, user]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoginError(''); 

        if(!username || !passwd ){
            setLoginError('Por favor, ingresa usuario y contraseña');
            return;
        }

        const result = await login({username, passwd});

        if(!result.success){
            setLoginError(result.message || 'Error de autenticacion')
        }
    }


    return(
        <Container style={{width:'40%'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Ingrese su nombre de usuario" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="text" value={passwd} onChange={(e)=> setPasswd(e.target.value)}  placeholder="Ingrese su contraseña correspondiente" />
                </Form.Group>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                <Button variant="primary" type="submit">Iniciar Sesión</Button>
            </Form> 
        </Container>
    )
}
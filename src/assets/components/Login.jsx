import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form, Container, Button } from 'react-bootstrap';

export const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ passwd, setPasswd ] = useState('');
    const [ loginError, setLoginError ] = useState('');

    const { login, isAuthenticated, user } = useAuth(); // custom hook que consume el contexto de autenticacion
    const navigate= useNavigate();

    // Se ejecuta al comprobar que el usuario esta autenticado
    useEffect( () => { 
        if(isAuthenticated)
            if( user?.rol === 'administrativo' || user?.rol === 'usuario-normal')
                navigate('/lista', {replace: true});
        else
            navigate('/', {replace: true});
    }, [isAuthenticated, navigate, user]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoginError(''); 

        if(!username || !passwd ){
            setLoginError('Por favor, ingresa usuario y contraseña');
            return;
        }

        //Intento de login
        const result = await login({username, passwd}); // await pausa la ejecución de handleSubmit hasta que login(..) termine (ya sea con éxito o error)
        if(!result.success){
            setLoginError(result.message || 'Error de autenticacion')
        }
    }


    return(
        <Container className="home-login">
            <h3>Inicio de Sesion</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Ingrese su nombre de usuario" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" autoComplete="off" value={passwd} onChange={(e)=> setPasswd(e.target.value)}  placeholder="Ingrese su contraseña correspondiente" />
                </Form.Group>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                <Button className="button" type="submit">Iniciar Sesión</Button>
            </Form> 
        </Container>
    )
}
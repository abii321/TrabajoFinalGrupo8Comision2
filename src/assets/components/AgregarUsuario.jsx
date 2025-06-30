import { useState } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import userData from "../data/usuarios.json";

export const AgregarUsuario = () => {
    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState("");
    const [passwd, setPasswd] = useState("");
    const [cpasswd, setCpasswd] = useState("");
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState(false);

    const navigate = useNavigate();

    const validarCampos = () => {
        const nuevosErrores = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username.trim()) nuevosErrores.username = "El nombre de usuario es obligatorio.";
        if (!correo.trim()) nuevosErrores.correo = "El correo es obligatorio.";
        else if (!emailRegex.test(correo)) nuevosErrores.correo = "El formato del correo no es válido.";
        if (passwd.length < 6) nuevosErrores.passwd = "La contraseña debe tener al menos 6 caracteres.";
        if (passwd !== cpasswd) nuevosErrores.cpasswd = "Las contraseñas no coinciden.";

        // Validación de usuario ya existente
        const localUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const todosLosUsuarios = [...userData, ...localUsuarios];
        const existe = todosLosUsuarios.find(u => u.username === username);

        if (existe) nuevosErrores.username = "Este nombre de usuario ya está registrado.";

        return nuevosErrores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validaciones = validarCampos();

        if (Object.keys(validaciones).length > 0) {
            setErrores(validaciones);
            return;
        }

        const nuevoUsuario = {
            id: Date.now().toString(),
            username,
            passwd,
            rol: "usuario-normal",
            name: username,
            correo
        };

        const localUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        localUsuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(localUsuarios));

        setExito(true);
        setErrores({});
        
        setTimeout(() => navigate('/'), 1500);
    };

    return (
        <Container className='registro'>
            <h3>Registro de Usuario</h3>
            {exito && <Alert variant="success">¡Usuario registrado! Redirigiendo al login...</Alert>}

            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        isInvalid={!!errores.username}
                    />
                    <Form.Control.Feedback type="invalid">{errores.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        isInvalid={!!errores.correo}
                    />
                    <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                        isInvalid={!!errores.passwd}
                        autoComplete="new-password"
                    />
                    <Form.Control.Feedback type="invalid">{errores.passwd}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirmación de Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={cpasswd}
                        onChange={(e) => setCpasswd(e.target.value)}
                        isInvalid={!!errores.cpasswd}
                        autoComplete="new-password"
                    />
                    <Form.Control.Feedback type="invalid">{errores.cpasswd}</Form.Control.Feedback>
                </Form.Group>

                <Button className='button' type="submit">Crear Usuario</Button>
            </Form>
        </Container>
    );
};

import useAuth from "../hooks/useAuth";
import { Spinner, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const ProtectorRutas = ( { allowedRoles, children } ) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    // 1. Mostrar un spinner mientras se carga el estado de autenticacion
    if (isLoading){
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando autenticacion...</span>
                </Spinner>
                <p className="mt-2">Verificando sesion...</p>
            </Container>
        );
    }

    // 2. Si no esta autenticado, redirigir al login
    if(!isAuthenticated){
        return <Navigate to="/" replace />
    }

    // 3. Si esta autenticado, verificar el rol (si se especificaron roles permitidos)
    if( allowedRoles && ! allowedRoles.includes(user?.rol)){
        return <Navigate to="/" replace/>
    }

    // 4. Si esta autenticado y autorizado por el rol, renderizar el componente hijo
    return children;
}

export default ProtectorRutas;
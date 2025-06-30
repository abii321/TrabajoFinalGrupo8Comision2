import { Login } from "../components/Login";
import { Principal } from "../components/Principal";
import { Container } from "react-bootstrap";

export const Home = () => {
    return (
        <Container className="home">
            <Principal />
            <Login />
        </Container>
    )
}
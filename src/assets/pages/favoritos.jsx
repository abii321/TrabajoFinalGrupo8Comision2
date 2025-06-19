// views/Favoritos.jsx
import { Container } from "react-bootstrap";
import { FavoritosCards } from "../components/FavoritosCard";

export const Favoritos = () => {
  return (
    <Container className="mt-4">
      <h2>Mis productos favoritos</h2>
      <FavoritosCards />
    </Container>
  );
};

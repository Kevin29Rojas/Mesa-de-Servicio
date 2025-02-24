import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Error = () => {
    return (
        <Container className="mt-5 text-center">
            <h2 className="text-danger">Error 404 - Página No Encontrada</h2>
            <p>La página que estás buscando no existe o ha sido movida.</p>
            <Link to="/">
                <Button variant="primary">Volver al Inicio</Button>
            </Link>
        </Container>
    );
};

export default Error;

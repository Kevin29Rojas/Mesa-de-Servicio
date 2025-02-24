import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Button, Navbar, Nav } from "react-bootstrap";

const Inicio = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Mesa de Servicio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {!user ? (
                                <>
                                    <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                                </>
                            ) : (
                                <>
                                    {user.rol === "cliente" && <Nav.Link as={Link} to="/cliente/mis-casos">Mis Casos</Nav.Link>}
                                    {user.rol === "administrador" && <Nav.Link as={Link} to="/admin/gestion-casos">Gestionar Casos</Nav.Link>}
                                    <Button variant="outline-light" onClick={logout} className="ms-2">Cerrar Sesión</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-5 text-center">
                <h2>Bienvenido a la Mesa de Servicio</h2>
                <p>Una plataforma para gestionar casos de soporte de manera eficiente.</p>
                {!user && (
                    <>
                        <Link to="/login">
                            <Button variant="primary" className="me-2">Iniciar Sesión</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="success">Registrarse</Button>
                        </Link>
                    </>
                )}
            </Container>
        </>
    );
};

export default Inicio;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", { correo, contrasena });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.usuario));
            navigate(response.data.usuario.rol === "administrador" ? "/admin/gestion-casos" : "/cliente/mis-casos");
        } catch (error) {
            alert("Error al iniciar sesión");
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="contrasena">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">Iniciar Sesión</Button>
            </Form>
        </Container>
    );
};

export default Login;

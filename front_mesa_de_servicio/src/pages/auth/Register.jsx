import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";


const Register = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("cliente");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/register", { nombre, correo, contrasena, rol });
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            alert("Error al registrarse");
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Registro</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="contrasena">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="rol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value=" "> </option>
                        <option value="cliente">cliente</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3 w-100">Registrarse</Button>
            </Form>
        </Container>
    );
};

export default Register;

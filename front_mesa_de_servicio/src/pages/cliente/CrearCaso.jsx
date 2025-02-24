import { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const CrearCaso = () => {
    const [descripcion, setDescripcion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://127.0.0.1:8000/api/casos", { descripcion }, { headers: { Authorization: `Bearer ${token}` } });
            alert("Caso creado exitosamente.");
        } catch (error) {
            alert("Error al crear caso");
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Crear Nuevo Caso</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripción del Problema</Form.Label>
                    <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">Enviar Caso</Button>
            </Form>
        </Container>
    );
};

export default CrearCaso;

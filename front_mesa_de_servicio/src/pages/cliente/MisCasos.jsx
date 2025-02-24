import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const MisCasos = () => {
    const [casos, setCasos] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState("");

    useEffect(() => {
        fetchCasos();
    }, []);

    const fetchCasos = async () => {
        const token = localStorage.getItem("token");
        let url = "http://127.0.0.1:8000/api/casos";

        if (filtroEstado) {
            url += `?estado=${filtroEstado}`;
        }

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCasos(response.data);
    };

    const verHistorial = async (id) => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://127.0.0.1:8000/api/casos/${id}/historial`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setHistorial(response.data);
        setShowModal(true);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Mis Casos</h2>

            {/* Filtro por estado */}
            <Form className="mb-3">
                <Form.Group>
                    <Form.Label>Filtrar por Estado</Form.Label>
                    <Form.Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Abierto">Abierto</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Resuelto">Resuelto</option>
                        <option value="Cerrado">Cerrado</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={fetchCasos}>Aplicar Filtro</Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {casos.map((caso) => (
                        <tr key={caso.id}>
                            <td>{caso.id}</td>
                            <td>{caso.descripcion}</td>
                            <td>{caso.estado}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => verHistorial(caso.id)}>Ver Historial</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para mostrar historial */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Historial del Caso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {historial.length > 0 ? historial.map((h, index) => (
                            <li key={index}>{h.cambio} - {new Date(h.created_at).toLocaleString()}</li>
                        )) : <p>No hay historial disponible.</p>}
                    </ul>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default MisCasos;

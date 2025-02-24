import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const GestionCasos = () => {
    const [casos, setCasos] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroUsuario, setFiltroUsuario] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchCasos();
    }, []);

    const fetchCasos = async () => {
        const token = localStorage.getItem("token");
        let url = "http://127.0.0.1:8000/api/casos";

        const params = {};
        if (filtroEstado) params.estado = filtroEstado;
        if (filtroUsuario) params.usuario_id = filtroUsuario;

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            params,
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

    const actualizarEstado = async (id, nuevoEstado) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://127.0.0.1:8000/api/casos/${id}`, { estado: nuevoEstado }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Estado actualizado correctamente.");
            fetchCasos();
        } catch (error) {
            alert("Error al actualizar el estado.");
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Gestión de Casos</h2>

            {/* Filtros de búsqueda */}
            <Form className="mb-3">
                <Form.Group className="mb-2">
                    <Form.Label>Filtrar por Estado</Form.Label>
                    <Form.Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Abierto">Abierto</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Resuelto">Resuelto</option>
                        <option value="Cerrado">Cerrado</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Filtrar por Usuario (ID)</Form.Label>
                    <Form.Control type="text" value={filtroUsuario} onChange={(e) => setFiltroUsuario(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={fetchCasos}>Aplicar Filtros</Button>
            </Form>

            {/* Tabla de casos */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Usuario ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {casos.map((caso) => (
                        <tr key={caso.id}>
                            <td>{caso.id}</td>
                            <td>{caso.descripcion}</td>
                            <td>{caso.estado}</td>
                            <td>{caso.usuario_id}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => verHistorial(caso.id)} className="me-2">
                                    Ver Historial
                                </Button>
                                {user?.rol === "administrador" && (
                                    <>
                                        <Button variant="warning" size="sm" onClick={() => actualizarEstado(caso.id, "En proceso")} className="me-2">
                                            En Proceso
                                        </Button>
                                        <Button variant="success" size="sm" onClick={() => actualizarEstado(caso.id, "Resuelto")} className="me-2">
                                            Resuelto
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => actualizarEstado(caso.id, "Cerrado")}>
                                            Cerrado
                                        </Button>
                                    </>
                                )}
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

export default GestionCasos;

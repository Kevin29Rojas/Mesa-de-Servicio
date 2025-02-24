import { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";

const Reportes = () => {
    const [reportes, setReportes] = useState(null);

    useEffect(() => {
        const fetchReportes = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/reportes", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReportes(response.data);
            } catch (error) {
                alert("Error al obtener reportes");
            }
        };
        fetchReportes();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="text-center">Reportes</h2>
            {reportes ? (
                <ListGroup>
                    <ListGroup.Item>Total de Casos: {reportes.total_casos}</ListGroup.Item>
                    <ListGroup.Item>Casos Abiertos: {reportes.casos_abiertos}</ListGroup.Item>
                    <ListGroup.Item>Casos en Proceso: {reportes.casos_en_proceso}</ListGroup.Item>
                    <ListGroup.Item>Casos Resueltos: {reportes.casos_resueltos}</ListGroup.Item>
                    <ListGroup.Item>Casos Cerrados: {reportes.casos_cerrados}</ListGroup.Item>
                </ListGroup>
            ) : (
                <p className="text-center">Cargando reportes...</p>
            )}
        </Container>
    );
};

export default Reportes;

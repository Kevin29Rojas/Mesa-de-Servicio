import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/shared/inicio";
import NotFound from "../pages/shared/error";
import CrearCaso from "../pages/cliente/CrearCaso";
import MisCasos from "../pages/cliente/MisCasos";
import GestionCasos from "../pages/admin/GestionCasos";
import Reportes from "../pages/admin/Reportes";

// Componente para proteger rutas privadas
const PrivateRoute = ({ element, role }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role && user.rol !== role) {
        return <Navigate to="/" />;
    }

    return element;
};

const AppRouter = () => {
    return (
        <Routes> {/* ✅ Eliminamos el <Router> extra */}
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas para Clientes */}
            <Route path="/cliente/crear-caso" element={<PrivateRoute element={<CrearCaso />} role="cliente" />} />
            <Route path="/cliente/mis-casos" element={<PrivateRoute element={<MisCasos />} role="cliente" />} />

            {/* Rutas para Administradores */}
            <Route path="/admin/gestion-casos" element={<PrivateRoute element={<GestionCasos />} role="administrador" />} />
            <Route path="/admin/reportes" element={<PrivateRoute element={<Reportes />} role="administrador" />} />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;

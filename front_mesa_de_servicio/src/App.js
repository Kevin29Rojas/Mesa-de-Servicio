import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    return (
        <BrowserRouter> {}
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

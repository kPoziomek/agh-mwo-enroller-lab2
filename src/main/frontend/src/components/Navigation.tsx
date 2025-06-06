import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const Navigation = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="row">
                    <div className="column">
                        <div className="nav-links">
                            <Link to="/meetings" className="nav-link">📅 Spotkania</Link>
                            <Link to="/new-meeting" className="nav-link">➕ Dodaj spotkanie</Link>
                        </div>
                    </div>
                    <div className="column column-33">
                        <div className="nav-user">
                            <p className="user-info">👤 {user?.login}</p>
                            <button onClick={handleLogout} className="button button-outline button-small">
                                Wyloguj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

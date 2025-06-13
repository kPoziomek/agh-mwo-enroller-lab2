import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {useTranslation} from "react-i18next";

export const Navigation = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation()

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
                            <Link to="/meetings" className="nav-link">{t("navigation.meetings")}</Link>
                            <Link to="/new-meeting" className="nav-link">{t("navigation.newMeeting")}</Link>
                        </div>
                    </div>
                    <div className="column column-33">
                        <div className="nav-user">
                            <p className="user-info">{user?.login}</p>
                            <button onClick={handleLogout} className="button button-outline button-small">
                                {t('navigation.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

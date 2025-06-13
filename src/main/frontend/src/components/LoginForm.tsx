import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {useTranslation} from "react-i18next";

export const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {t}= useTranslation()
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!login || !password) {
            setError(t('loginForm.error.errorEmptyFields'));
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const success = await loginUser(login, password);

            if (success) {
                navigate('/meetings');
            } else {
                setError(t('loginForm.error.invalidCredentials'));
            }
        } catch (err) {
            setError(t('loginForm.error.unknownError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-center mb-2">{t('loginForm.title')}</h2>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <fieldset disabled={isLoading}>
                    <label htmlFor="username">{t('loginForm.userName')}</label>
                    <input
                        type="text"
                        id="username"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder={t('loginForm.userNamePlaceholder')}
                        required
                    />

                    <label htmlFor="password">{t('loginForm.password')}</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('loginForm.passwordPlaceholder')}
                        required
                    />

                    <button
                        type="submit"
                        className="button button-primary"
                    >
                        {isLoading ? t('loginForm.loadingButton') : t('loginForm.loginButton')}
                    </button>
                </fieldset>
            </form>

            <div className="text-center mt-1">
                <p className="text-muted mb-0">
                    {t('loginForm.register')}{' '}
                    <Link to="/register">{t("loginForm.registerLink")}</Link>
                </p>
            </div>
        </div>
    );
};

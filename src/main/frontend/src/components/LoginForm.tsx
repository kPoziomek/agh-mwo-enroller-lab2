import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!login || !password) {
            setError('Wprowadź nazwę użytkownika i hasło');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const success = await loginUser(login, password);

            if (success) {
                navigate('/meetings');
            } else {
                setError('Nieprawidłowa nazwa użytkownika lub hasło');
            }
        } catch (err) {
            console.error('Szczegóły błędu:', err);
            setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-center mb-2">🔐 Logowanie</h2>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <fieldset disabled={isLoading}>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input
                        type="text"
                        id="username"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Wprowadź login"
                        required
                    />

                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wprowadź hasło"
                        required
                    />

                    <button
                        type="submit"
                        className="button button-primary"
                    >
                        {isLoading ? '⏳ Logowanie...' : '🔓 Zaloguj się'}
                    </button>
                </fieldset>
            </form>

            <div className="text-center mt-1">
                <p className="text-muted mb-0">
                    Nie masz konta?{' '}
                    <Link to="/register">Utwórz konto</Link>
                </p>
            </div>
        </div>
    );
};

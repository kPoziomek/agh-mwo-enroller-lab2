import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/userService';

export const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Walidacja
        if (!formData.login.trim() || !formData.password.trim()) {
            setError('Login i hasło są wymagane');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła muszą się zgadzać');
            return;
        }

        if (formData.password.length < 3) {
            setError('Hasło musi mieć co najmniej 3 znaki');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const success = await createUser({
                login: formData.login.trim(),
                password: formData.password
            });

            if (success) {
                alert('Konto zostało utworzone! Możesz się teraz zalogować.');
                navigate('/');
            } else {
                setError('Nie udało się utworzyć konta. Login może być już zajęty.');
            }
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.response?.status === 409) {
                setError('Użytkownik o tym loginie już istnieje');
            } else {
                setError('Wystąpił błąd podczas tworzenia konta');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-center mb-2">📝 Utwórz konto</h2>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <fieldset disabled={isLoading}>
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleInputChange}
                        placeholder="Wprowadź login"
                        required
                    />

                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Wprowadź hasło"
                        required
                    />

                    <label htmlFor="confirmPassword">Potwierdź hasło</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Powtórz hasło"
                        required
                    />

                    <button
                        type="submit"
                        className="button button-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? '⏳ Tworzenie konta...' : '✅ Utwórz konto'}
                    </button>
                </fieldset>
            </form>

            <div className="text-center mt-1">
                <p className="text-muted mb-0">
                    Masz już konto?{' '}
                    <Link to="/">Zaloguj się</Link>
                </p>
            </div>
        </div>
    );
};
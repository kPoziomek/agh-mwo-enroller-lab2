import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/userService';
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

export const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {t}= useTranslation();
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
            setError(t('createForm.error.emptyFields'));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError(t('createForm.error.passwordMismatch'));
            return;
        }

        if (formData.password.length < 3) {
            setError(t('createForm.error.passwordTooShort'));
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
                toast(t('createForm.toastSuccess'));
                navigate('/');
            } else {
                setError(t('createForm.toastFailure'));
            }
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.response?.status === 409) {
                setError(t('createForm.error.userExists'));
            } else {
                setError(t('createForm.error.unknownError'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-center mb-2">{t("createForm.title")}</h2>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <fieldset disabled={isLoading}>
                    <label htmlFor="login">{t("createForm.login")}</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleInputChange}
                        placeholder={t("createForm.loginPlaceholder")}
                        required
                    />

                    <label htmlFor="password">{t("createForm.password")}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={t("createForm.passwordPlaceholder")}
                        required
                    />

                    <label htmlFor="confirmPassword">
                        {t("createForm.confirmPassword")}
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder={t("createForm.confirmPasswordPlaceholder")}
                        required
                    />

                    <button
                        type="submit"
                        className="button button-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? t("createForm.loadingButton"): t("createForm.createButton")}
                    </button>
                </fieldset>
            </form>

            <div className="text-center mt-1">
                <p className="text-muted mb-0">
                    {t("createForm.text")}{' '}
                    <Link to="/">{t('createForm.loginLink')}</Link>
                </p>
            </div>
        </div>
    );
};
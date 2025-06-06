import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {LoginForm} from "../components/LoginForm.tsx";
export const HomeRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/meetings" replace />;
  }

  return <LoginForm />;
};
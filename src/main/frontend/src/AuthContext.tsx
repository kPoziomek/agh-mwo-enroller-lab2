import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type {User} from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
import axios from 'axios';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = async (login: string, password: string): Promise<boolean> => {
    try {

      const response = await axios.post(`/api/auth/login`, {
        login,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        validateStatus: (status) => {
          return status >= 200 && status < 300 || status === 401;
      }
      });


      if (response.status === 401) {
        console.error('Nieprawidłowe dane logowania');
        return false;
      }

      const receivedToken = response.data.token;
      const userData = response.data.user;

      if (!receivedToken || !userData) {
        console.error('Brak tokenu lub danych użytkownika w odpowiedzi:', response.data);
        return false;
      }

      const userToStore: User = {
        login: userData.login,
        password: '',
      };

      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('login', userData.login);

      setToken(receivedToken);
      setUser(userToStore);
      setIsAuthenticated(true);

      return true;
    } catch (error: any) {
      console.error('Błąd podczas logowania:', error);
      if (error.response?.status === 401) {
        console.error('Nieprawidłowe dane logowania');
      } else {
        console.error('Szczegóły odpowiedzi serwera:', error.response?.data);
        console.error('Status HTTP:', error.response?.status);
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

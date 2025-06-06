import { useNavigate } from 'react-router-dom';
import type {ReactNode} from "react";

interface UnauthenticatedLayoutProps {
  children: ReactNode;
}

export const UnauthenticatedLayout = ({ children }: UnauthenticatedLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="container text-center">
      <header className="mb-3">
        <h1 className="mb-1">📅 Meeting Organizer</h1>
        <p className="text-muted mb-2">
          Zarządzaj spotkaniami i uczestnictwem w prosty sposób
        </p>
        
        <div className="mb-2">
          <button 
            className="button button-primary"
            onClick={() => navigate('/')}
          >
            🔓 Zaloguj się
          </button>
          <button 
            className="button button-outline"
            onClick={() => navigate('/register')}
          >
            📝 Utwórz konto
          </button>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer className="mt-3 text-muted">
        <p>
          ✨ Dołącz do spotkań, zarządzaj uczestnictwem i organizuj wydarzenia w jednym miejscu
        </p>
      </footer>
    </div>
  );
};
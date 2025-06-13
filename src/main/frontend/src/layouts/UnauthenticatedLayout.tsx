import { useNavigate } from 'react-router-dom';
import type {ReactNode} from "react";
import {useTranslation} from "react-i18next";

interface UnauthenticatedLayoutProps {
  children: ReactNode;
}

export const UnauthenticatedLayout = ({ children }: UnauthenticatedLayoutProps) => {
  const navigate = useNavigate();
const {t}= useTranslation();
  return (
    <div className="container text-center">
      <header className="mb-3">
        <h1 className="mb-1">{t('welcome')}</h1>
        <p className="text-muted mb-2">
            {t('unauthenticatedLayout.description')}
        </p>
        
        <div className="mb-2">
          <button 
            className="button button-primary"
            onClick={() => navigate('/')}
          >
              {t('unauthenticatedLayout.loginButton')}
          </button>
          <button 
            className="button button-outline"
            onClick={() => navigate('/register')}
          >
            {t('unauthenticatedLayout.registerButton')}
          </button>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer className="mt-3 text-muted">
        <p>
            {t('unauthenticatedLayout.footerText')}
        </p>
      </footer>
    </div>
  );
};
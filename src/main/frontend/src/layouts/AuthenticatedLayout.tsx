import {type ReactNode} from 'react';
import { Navigation } from '../components/Navigation';
import LanguageSelector from "@/components/LanguageSelector.tsx";
import {useTranslation} from "react-i18next";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <header className="text-center mb-2 row">
          <div className="column column-50 column-offset-25">
              <h1 className="mb-1">{t('welcome')}</h1>
          </div>
        <LanguageSelector />
      </header>
      
      <Navigation />

      <main>
        {children}
      </main>
    </div>
  );
};
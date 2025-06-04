import type { ReactNode } from 'react';
import { Navigation } from '../components/Navigation';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <div className="container">
      <header className="text-center mb-2">
        <h1 className="mb-1">📅 Meeting Organizer</h1>
      </header>
      
      <Navigation />

      <main>
        {children}
      </main>
    </div>
  );
};
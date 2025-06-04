import './App.css';
import './styles/custom.css';
import { AuthProvider, useAuth } from './AuthContext';
import { AppRoutes } from './routes';
import { AuthenticatedLayout, UnauthenticatedLayout } from './layouts';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedLayout>
          <AppRoutes />
        </AuthenticatedLayout>
      ) : (
        <UnauthenticatedLayout>
          <AppRoutes />
        </UnauthenticatedLayout>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

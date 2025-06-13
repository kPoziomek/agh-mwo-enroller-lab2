import './App.css';
import './styles/custom.css';
import { AuthProvider, useAuth } from './AuthContext';
import { AppRoutes } from './routes';
import { AuthenticatedLayout, UnauthenticatedLayout } from './layouts';
import {Toaster} from "react-hot-toast";
import './i18n.tsx';
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
      <Toaster/>
    </AuthProvider>
  );
}

export default App;

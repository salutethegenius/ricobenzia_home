import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';
import ContentEditor from '../components/admin/ContentEditor';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function Admin() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="edit/:section"
        element={
          <ProtectedRoute>
            <ContentEditor />
          </ProtectedRoute>
        }
      />
      <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';
import ContentEditor from '../components/admin/ContentEditor';
import Messages from '../components/admin/Messages';
import EventManager from '../components/admin/EventManager';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  // Development mode: Allow access without authentication for viewing
  // In production, remove this or set via environment variable
  const devMode = import.meta.env.DEV; // Automatically true in development

  if (loading && !devMode) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Allow access in dev mode for viewing, require auth in production
  if (!isAuthenticated && !devMode) {
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
      <Route
        path="messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="events"
        element={
          <ProtectedRoute>
            <EventManager />
          </ProtectedRoute>
        }
      />
      <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

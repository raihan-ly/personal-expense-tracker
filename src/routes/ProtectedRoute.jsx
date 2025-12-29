import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLoader from '../components/AppLoader';

const ProtectedRoute = ({ children }) => {
    const { user, role, loading } = useAuth();

    if (loading) {
        return <AppLoader label="Preparing dashboard" />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;

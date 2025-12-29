import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLoader from '../components/AppLoader';

const AdminRoute = ({ children }) => {
    const { user, role, loading } = useAuth();

    if (loading) {
        return <AppLoader label="Checking permissions" />;
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;

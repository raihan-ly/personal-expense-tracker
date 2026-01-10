import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyProfile } from '../lib/profile';
import { useEffect, useState } from 'react';
import AppLoader from '../components/AppLoader';

const ProtectedRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        getMyProfile()
            .then((profile) => setRole(profile.role))
            .catch(() => setRole(null))
            .finally(() => setLoading(false));
    }, [user]);

    if (authLoading || loading) {
        return <AppLoader label="Preparing dashboard" />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 🚫 Admins are not allowed on user dashboard
    if (role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;

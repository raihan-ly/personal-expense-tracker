import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import AuthForm from '../components/AuthForm';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import PageLayout from '../components/PageLayout';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route
                path="/login"
                element={
                    <PageLayout showHeader={false}>
                        <AuthForm />
                    </PageLayout>
                }
            />

            {/* User Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <PageLayout title="Expense Dashboard">
                            <Dashboard />
                        </PageLayout>
                    </ProtectedRoute>
                }
            />

            {/* Admin Dashboard */}
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <PageLayout title="Admin Dashboard">
                            <AdminDashboard />
                        </PageLayout>
                    </AdminRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>

    );
};

export default AppRoutes;

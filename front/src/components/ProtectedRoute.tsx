import { useAuth } from '../providers/AuthContextProvider.tsx';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { Box } from '@mui/joy';
import Sidebar from './Sidebar.tsx';

interface ProtectedRouteInterface {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteInterface) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ marginLeft: 200 }}>{children}</div>
        </Box>
    );
};

export default ProtectedRoute;

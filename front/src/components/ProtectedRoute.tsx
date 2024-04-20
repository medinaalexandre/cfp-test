import { useAuth } from '../providers/AuthContextProvider.tsx';
import { Navigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, Drawer, IconButton, Stack } from '@mui/joy';
import Sidebar from './Sidebar.tsx';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile } from 'react-device-detect';

interface ProtectedRouteInterface {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteInterface) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isMobile) {
        return (
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Sidebar />
                <div
                    style={{
                        marginLeft: 200,
                    }}
                >
                    {children}
                </div>
            </Box>
        );
    }

    return (
        <Stack>
            <Stack>
                <IconButton
                    style={{ marginLeft: 'auto' }}
                    size="md"
                    onClick={() => setIsOpenDrawer((prev) => !prev)}
                >
                    <MenuIcon />
                </IconButton>
            </Stack>
            <Drawer
                open={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                sx={{
                    '& .MuiDrawer-content': {
                        width: 200,
                    },
                }}
            >
                <Sidebar />
            </Drawer>
            <div>{children}</div>
        </Stack>
    );
};

export default ProtectedRoute;

import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute.tsx';
import Users from '../pages/Users';
import CreateUser from '../pages/Users/create.tsx';

export const Routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: '/users',
        element: (
            <ProtectedRoute>
                <Users />
            </ProtectedRoute>
        ),
    },
    {
        path: '/users/create',
        element: (
            <ProtectedRoute>
                <CreateUser />
            </ProtectedRoute>
        ),
    },
]);
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ProtectedRoute from "../components/ProtectedRoute.tsx";

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute> <Home /> </ProtectedRoute>,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

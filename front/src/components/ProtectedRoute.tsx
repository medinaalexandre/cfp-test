import {useAuth} from "../providers/AuthContextProvider.tsx";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";

interface ProtectedRouteInterface {
    children:  React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteInterface) => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }


    return children;
}

export default ProtectedRoute;
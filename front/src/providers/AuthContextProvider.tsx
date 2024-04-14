import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import {Auth} from "../entities/Auth.ts";
import {CircularProgress, Stack} from "@mui/joy";

interface AuthContextInterface {
    children: ReactElement
}

const AuthContext = createContext({isAuthenticated: false, setIsAuthenticated: (_: boolean) => {}})
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: AuthContextInterface) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(
        () => {
            Auth.check()
                .then(() => {
                    setIsAuthenticated(true)
                })
                .catch(() => {
                    setIsAuthenticated(false)
                }).finally(() => setIsLoading(false))
        }, []);

    if (isLoading) {
        return <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <CircularProgress />
        </Stack>
    }

    return <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
};

export default AuthContextProvider;

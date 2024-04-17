import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AuthContextProvider from './providers/AuthContextProvider.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import SnackbarContextProvider from './providers/SnackbarContextProvider.tsx';

const queryClient = new QueryClient();

function App() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <SnackbarContextProvider>
                    <AuthContextProvider>
                        <RouterProvider router={Routes}></RouterProvider>
                    </AuthContextProvider>
                </SnackbarContextProvider>
            </QueryClientProvider>
        </CssVarsProvider>
    );
}

export default App;

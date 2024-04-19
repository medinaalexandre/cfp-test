import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AuthContextProvider from './providers/AuthContextProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </CssVarsProvider>
    );
}

export default App;

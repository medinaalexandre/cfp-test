import { RouterProvider} from 'react-router-dom';
import { Routes } from './routes';
import { CssBaseline, CssVarsProvider} from '@mui/joy';
import AuthContextProvider from "./providers/AuthContextProvider.tsx";

function App() {
    return (
        <CssVarsProvider defaultMode="dark">
            <CssBaseline />
            <AuthContextProvider>
                <RouterProvider router={Routes}>
                </RouterProvider>
            </AuthContextProvider>
        </CssVarsProvider>
    );
}

export default App;

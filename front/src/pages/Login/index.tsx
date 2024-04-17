import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { Auth } from '../../entities/Auth.ts';
import { useState } from 'react';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContextProvider.tsx';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const login = () => {
        if (!email || !password) {
            return;
        }

        Auth.login({
            email,
            password,
            device_name: navigator.userAgent,
        })
            .then(() => {
                setIsAuthenticated(true);
                navigate('/');
            })
            .catch((e) => console.error(e));
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <Form onSubmit={login}>
                <Stack
                    alignContent="center"
                    sx={{
                        maxWidth: 300,
                    }}
                    spacing={2}
                >
                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Button type="submit">Login</Button>
                </Stack>
            </Form>
        </Stack>
    );
};

export default Login;

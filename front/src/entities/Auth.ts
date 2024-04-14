import Api from '../services/api';

export interface LoginInterface {
    email: string;
    password: string;
    device_name: string;
}

class AuthEntity {
    login = (params: LoginInterface) =>
        Api.post('/api/login', { ...params })
            .catch((e) => console.error(e))

    check = async () => {
        await Api.get('/sanctum/csrf-cookie');
        return Api.get('/api/check');
    }
}

export const Auth: AuthEntity = new AuthEntity();

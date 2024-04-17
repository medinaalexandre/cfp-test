import Api from '../services/api.ts';
import { AxiosResponse } from 'axios';

export interface CommonUser {
    first_name: string;
    last_name: string;
    username: string;
    mobile: string;
    email: string;
    birthday: string;
}

export interface UserData extends CommonUser {
    id: number;
}

export interface CreateOrUpdateUser extends CommonUser {
    password: string;
}

interface UserListResponse {
    data: Array<UserData>;
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
}

interface UserCreateOrUpdateResponse {
    data: UserData;
}

class UserEntity {
    list = async () => {
        return await Api.get('/api/users').then(
            (res: AxiosResponse<UserListResponse>) => res.data
        );
    };

    create = async (params: CreateOrUpdateUser) => {
        return await Api.post('/api/users', { ...params }).then(
            (res: AxiosResponse<UserCreateOrUpdateResponse>) => res.data
        );
    };
}

export const User: UserEntity = new UserEntity();

import Api from '../services/api.ts';
import { AxiosResponse } from 'axios';
import {
    UserRequest,
    UserCreateOrUpdateResponse,
    UserDeleteInterface,
    UserListParams,
    UserListResponse,
    UserViewResponse,
} from './User.types.ts';

class UserEntity {
    list = async (params: UserListParams) => {
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(
                ([, v]) => v !== null && v !== undefined && v !== ''
            )
        );

        return await Api.get('/api/users', { params: cleanParams }).then(
            (res: AxiosResponse<UserListResponse>) => res.data
        );
    };

    get = async (id: number) => {
        return await Api.get(`/api/users/${id}`).then(
            (res: AxiosResponse<UserViewResponse>) => res.data
        );
    };

    createOrUpdate = async (params: UserRequest) => {
        if (params.id) {
            return await this.update(params);
        }

        return await this.create(params);
    };

    create = async (params: UserRequest) => {
        return await Api.post('/api/users', { ...params }).then(
            (res: AxiosResponse<UserCreateOrUpdateResponse>) => res.data
        );
    };

    update = async (params: UserRequest) => {
        return await Api.put(`/api/users/${params.id}`, { ...params }).then(
            (res: AxiosResponse<UserCreateOrUpdateResponse>) => res.data
        );
    };

    delete = async ({ id }: UserDeleteInterface) => {
        return await Api.delete(`/api/users/${id}`);
    };

    addRole = async (user_id: number, role_id: number) => {
        return await Api.post(`/api/users/${user_id}/roles/add`, {
            role_id,
        });
    };

    deleteRole = async (user_id: number, role_id: number) => {
        return await Api.delete(`/api/users/${user_id}/roles/${role_id}`);
    };
}

export const User: UserEntity = new UserEntity();

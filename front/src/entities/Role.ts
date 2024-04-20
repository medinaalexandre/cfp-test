import Api from '../services/api.ts';
import { AxiosResponse } from 'axios';
import { RoleListResponse } from './Role.types.ts';

class RoleEntity {
    list = async () => {
        return await Api.get('/api/roles').then(
            (res: AxiosResponse<RoleListResponse>) => res.data
        );
    };
}

export const Role: RoleEntity = new RoleEntity();

import Api from "../services/api.ts";
import {AxiosResponse} from "axios";

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    mobile: string;
    email: string;
}

interface UserListResponse {
    data: Array<UserData>;
}

class UserEntity {
    list = async () => {
        return await Api.get('/api/users').then((res: AxiosResponse<UserListResponse>) => res.data);
    }
}

export const User: UserEntity = new UserEntity();
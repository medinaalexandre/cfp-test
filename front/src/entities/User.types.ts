export interface CommonUser {
    first_name: string;
    last_name: string;
    username: string;
    mobile: string;
    email: string;
    birthday: string;
    is_admin: boolean;
}

export interface UserData extends CommonUser {
    id: number;
}

export interface CreateOrUpdateUser extends CommonUser {
    id?: number;
    password: string;
}

export interface UserResponse {
    data: UserData;
}

export interface UserListResponse {
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

export interface UserCreateOrUpdateResponse {
    data: UserData;
}

export interface UserListParams {
    per_page?: number;
    current_page: number;
    id?: number | null;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    mobile?: string;
}

export interface UserDeleteInterface {
    id: number;
}

export interface UserCreateResponseError {
    response: {
        data: {
            message: string;
            errors: Array<Record<string, Array<string>>>;
        };
        status: number;
    };
}

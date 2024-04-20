export interface CommonUser {
    first_name: string;
    last_name: string;
    username: string;
    mobile: string;
    email: string;
    birthday: string;
    is_admin: boolean;
}

export interface UserResource extends CommonUser {
    id: number;
}

export interface UserRequest extends CommonUser {
    id?: number;
    password: string;
}

export interface UserResponse {
    data: UserResource;
}

interface Role {
    id: number;
    name: string;
}

export interface UserViewResource extends UserResource {
    roles: Array<Role>;
}

export interface UserViewResponse {
    data: UserViewResource;
}

export interface UserListResponse {
    data: Array<UserResource>;
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
    data: UserResource;
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

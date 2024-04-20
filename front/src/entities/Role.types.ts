export interface Role {
    id: number;
    name: string;
}

export interface RoleListResponse {
    data: Array<Role>;
}

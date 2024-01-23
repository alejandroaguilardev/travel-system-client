export interface Permission {
    id: string;
    name: string;
    group: string;
    description: string;
}

export interface NewPermission extends Omit<Permission, "id" | "description"> {
    id?: string,
    description?: string;
}
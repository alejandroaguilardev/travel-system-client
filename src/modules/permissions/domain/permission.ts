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


export const hasPermission = (permission: Permission, group: string, currentPermission: string): boolean => {
    if (permission?.name?.toLowerCase() === currentPermission.toLowerCase() && permission?.group?.toLowerCase() === group?.toLowerCase()) return true;
    return false;
}
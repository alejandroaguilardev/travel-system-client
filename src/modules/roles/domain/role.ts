import { Permission, hasPermission } from '../../permissions/domain/permission';

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
}

export interface NewRole extends Omit<Role, 'id' | 'description' | 'permissions'> {
    id?: string;
    description?: string;
    permissions?: string[];
}


export const roleToNewRole = (role: Role): NewRole => {
    const permissions = role.permissions.map((permission) => {
        if (typeof permission === "string") return permission;
        return permission.id;
    });
    return { ...role, permissions }
}


export const hasRolePermission = (roles: Role[], currentGroup: string, currentPermission: string): boolean => {
    let isPermission = false;
    roles.forEach(role => {
        role.permissions.forEach(_ => {
            if (hasPermission(_, currentGroup, currentPermission)) {
                isPermission = true;
            }
        });
    });
    return isPermission;
}
import { Permission } from "./permission";

export const groupPermissionsByGroup = (permissions: Permission[]): { [group: string]: Permission[] } => {
    return permissions.reduce<{ [group: string]: Permission[] }>((acc, permission) => {
        const {group} = permission;

        if (!acc[group]) {
            acc[group] = [];
        }

        acc[group].push(permission);
        return acc;
    }, {});
};

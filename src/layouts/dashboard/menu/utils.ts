import { hasRolePermission } from '../../../modules/roles/domain/role';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';
import { User } from '../../../modules/users/domain/user';


export const hasPermission = (user: User | null, group: AuthGroup, permission: AuthPermission): boolean => {
    const roles = user?.roles ?? [];
    if (user?.auth?.admin) return true;
    return hasRolePermission(roles, group, permission);
}

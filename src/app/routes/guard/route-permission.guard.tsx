import { FC, ReactNode, useEffect, useState } from "react"
import NotAuthorizationView from '../../../presentation/error/403-view';
import { User } from '../../../modules/users/domain/user';
import { hasRolePermission } from '../../../modules/roles/domain/role';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';

type Props = {
    children: ReactNode;
    user: User | null;
    group: AuthGroup;
    permission: AuthPermission;
}

export const RoutePermissionGuard: FC<Props> = ({ children, user, group, permission }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (user) {
            setHasPermission(
                user.auth?.admin
                    ? true
                    : hasRolePermission(user.roles, group, permission))
            setIsLoading(false)
        }
    }, [user, group, permission])

    if (isLoading) return null;
    if (!hasPermission) return <NotAuthorizationView />

    return children
} 
import { FC, ReactNode, useEffect, useState } from "react"
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { useAuthContext } from '../../../auth/hooks/use-auth-context';
import { hasRolePermission } from '../../../../modules/roles/domain/role';

type Props = {
    children: ReactNode;
    group: AuthGroup;
    permission: AuthPermission;
}

export const PermissionGuard: FC<Props> = ({ children, group, permission }) => {
    const { user } = useAuthContext();
    const [hasPermission, setHasPermission] = useState(false);


    useEffect(() => {
        if (user) {
            setHasPermission(
                user.auth?.admin
                    ? true
                    : hasRolePermission(user.roles, group, permission))
        }
    }, [user, group, permission])

    if (!hasPermission) return null

    return children;
} 
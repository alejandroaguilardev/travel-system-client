import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Role } from '../../../../../modules/roles/domain/role';
import { roleService } from '../../../../../modules/roles/infrastructure/role.service';
import { useConditionContext } from '../../../contexts/condition-user-context';

export const useUserFormGeneral = () => {
    const { setValue, getValues } = useFormContext();
    const { isUser } = useConditionContext();

    const [roles, setRoles] = useState<Role[]>([]);
    const rolesDefault: string[] = getValues("roles") ?? [];
    useEffect(() => {
        if (rolesDefault.length > 0) {
            Promise.all(rolesDefault.map((role) => roleService.searchById<Role>(role)))
                .then(promises => setRoles(promises))
                .catch(() => setRoles([]));
        }
    }, [rolesDefault])

    const handleRoles = (value: Role | Role[] | null) => {
        if (value && Array.isArray(value)) {
            setRoles(value);
            setValue("roles", value.map(_ => _.id))
        }
    }

    return {
        roles,
        isUser,
        handleRoles
    }
}

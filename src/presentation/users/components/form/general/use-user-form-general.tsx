import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Role } from '../../../../../modules/roles/domain/role';
import { roleService } from '../../../../../modules/roles/infrastructure/role.service';
import { useConditionContext } from '../../../contexts/condition-user-context';
import { NewUser } from '../../../../../modules/users/domain/user';

export const useUserFormGeneral = () => {
    const { setValue, getValues, watch, formState } = useFormContext<NewUser>();
    const { isUser } = useConditionContext();
    const phone = watch("profile.phone");
    const phoneError = formState.errors.profile?.phone?.message ?? "";

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

    const handlePhone = (value: string) => setValue("profile.phone", value);

    return {
        roles,
        isUser,
        phone,
        phoneError,
        handleRoles,
        handlePhone
    }
}

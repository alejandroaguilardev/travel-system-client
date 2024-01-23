import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { permissionService } from '../../../../../modules/permissions/infrastructure/permission.service';
import { criteriaFactory } from '../../../../../modules/shared/domain/criteria/criteria.factory';
import { Permission } from '../../../../../modules/permissions/domain/permission';
import { useSwrQueryPagination } from '../../../../../hooks/use-swr-query-pagination';
import { groupPermissionsByGroup } from '../../../../../modules/permissions/domain/permission-group';

export const useRoleFormGeneral = () => {
    const { getValues, setValue } = useFormContext();

    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const defaultPermissions = getValues("permissions");

    const criteria = criteriaFactory({ start: 0, size: 500 });

    const { rows } = useSwrQueryPagination<Permission>({
        key: "RoleFormGeneral",
        criteria,
        search: permissionService.search
    });

    const groupPermissions = groupPermissionsByGroup(rows);

    const handleGroupChange = (groupKey: string) => {
        const groupPermissionIds = groupPermissions[groupKey].map(permission => permission.id);

        const updatedPermissions = selectedPermissions.includes(groupPermissionIds[0])
            ? selectedPermissions.filter(id => !groupPermissionIds.includes(id))
            : [...selectedPermissions, ...groupPermissionIds];

        setSelectedPermissions(updatedPermissions);
        setValue('permissions', updatedPermissions);
    };

    const handlePermissionChange = (permissionId: string) => {
        const updatedPermissions = selectedPermissions.includes(permissionId)
            ? selectedPermissions.filter(id => id !== permissionId)
            : [...selectedPermissions, permissionId];

        setSelectedPermissions(updatedPermissions);
        setValue('permissions', updatedPermissions);
    };

    useEffect(() => {
        if (defaultPermissions) {
            setSelectedPermissions(defaultPermissions);
        }
    }, [defaultPermissions]);

    return {
        groupPermissions,
        selectedPermissions,
        handlePermissionChange,
        handleGroupChange
    }
}

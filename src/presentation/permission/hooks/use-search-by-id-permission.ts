import useSWR from "swr";
import { endpoints } from '../../../modules/shared/domain/endpoint';
import { permissionService } from '../../../modules/permissions/infrastructure/permission.service';
import { Permission } from '../../../modules/permissions/domain/permission';

export const useSearchByIdPermission = (permissionId: string) => {
    const { data, error, isLoading, mutate } = useSWR([endpoints.permissions, permissionId], () => permissionService.searchById<Permission>(permissionId)
    )

    const handleRefetch = () => mutate();
    return {
        permission: data,
        isLoading,
        error,
        handleRefetch
    }
}

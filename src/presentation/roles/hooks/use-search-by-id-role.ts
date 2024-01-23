import useSWR from "swr";
import { endpoints } from '../../../modules/shared/domain/endpoint';
import { roleService } from '../../../modules/roles/infrastructure/role.service';
import { Role } from '../../../modules/roles/domain/role';

export const useSearchByIdRole = (roleId: string) => {
    const { data, error, isLoading, mutate } = useSWR([endpoints.roles, roleId], () => roleService.searchById<Role>(roleId)
    )

    const handleRefetch = () => mutate();
    return {
        role: data,
        isLoading,
        error,
        handleRefetch
    }
}

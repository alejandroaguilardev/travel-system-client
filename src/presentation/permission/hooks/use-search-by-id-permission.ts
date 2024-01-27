import { useState, useEffect } from 'react';
import { permissionService } from '../../../modules/permissions/infrastructure/permission.service';
import { Permission } from '../../../modules/permissions/domain/permission';

export const useSearchByIdPermission = (permissionId: string) => {
    const [permission, setPermission] = useState<Permission | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await permissionService.searchById<Permission>(permissionId);
            setPermission(response);
        } catch (error) {
            setPermission(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [permissionId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        permission: permission ?? undefined,
        isLoading,
        error,
        handleRefetch
    };
};

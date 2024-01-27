import { useState, useEffect } from 'react';
import { roleService } from '../../../modules/roles/infrastructure/role.service';
import { Role } from '../../../modules/roles/domain/role';

export const useSearchByIdRole = (roleId: string) => {
    const [role, setRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await roleService.searchById<Role>(roleId);
            setRole(response);
        } catch (error) {
            setRole(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [roleId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        role,
        isLoading,
        error,
        handleRefetch
    };
};

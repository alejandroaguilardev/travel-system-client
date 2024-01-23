import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { roleRemover } from '../../../modules/roles/application/remove/role-remover';
import { roleService } from '../../../modules/roles/infrastructure/role.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeleteRole = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (roleId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await roleRemover(roleService, uuid)(roleId)
            showNotification(response.message);
            callback();
        } catch (error) {
            showNotification(error.message, { variant: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        handleDelete
    }
}

import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { permissionRemover } from '../../../modules/permissions/application/remove/permission-remover';
import { permissionService } from '../../../modules/permissions/infrastructure/permission.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeletePermission = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (permissionId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await permissionRemover(permissionService, uuid)(permissionId)
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

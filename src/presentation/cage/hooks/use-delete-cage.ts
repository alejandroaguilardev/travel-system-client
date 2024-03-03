import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { cageRemover } from '../../../modules/cages/application/remove/cage-remover';
import { cageService } from '../../../modules/cages/infrastructure/cages.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeleteCage = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (cageId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await cageRemover(cageService, uuid)(cageId)
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

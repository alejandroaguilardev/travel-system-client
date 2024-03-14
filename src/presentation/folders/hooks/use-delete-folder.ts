import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { folderRemover } from '../../../modules/folders/application/remove/folder-remover';
import { folderService } from '../../../modules/folders/infrastructure/folders.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeleteFolder = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (folderId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await folderRemover(folderService, uuid)(folderId)
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

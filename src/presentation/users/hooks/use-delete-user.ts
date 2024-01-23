import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { userRemover } from '../../../modules/users/application/remove/user-remover';
import { userService } from '../../../modules/users/infrastructure/user.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeleteUser = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (userId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await userRemover(userService, uuid)(userId)
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

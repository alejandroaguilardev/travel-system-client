import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { petRemover } from '../../../modules/pets/application/remove/pet-remover';
import { petService } from '../../../modules/pets/infrastructure/pets.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeletePet = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (petId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await petRemover(petService, uuid)(petId)
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

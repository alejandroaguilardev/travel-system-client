import { useState } from 'react';
import uuid from '../../../modules/shared/infrastructure/adapter/uuid';
import { contractRemover } from '../../../modules/contracts/application/remove/contract-remover';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { useMessage } from '../../../hooks/use-message';


export const useDeleteContract = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (contractId: string, callback: () => void) => {
        setIsLoading(true);
        try {
            const response = await contractRemover(contractService, uuid)(contractId)
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

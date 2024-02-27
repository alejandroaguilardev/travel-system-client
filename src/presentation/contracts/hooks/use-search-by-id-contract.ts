import { useState, useEffect } from 'react';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { Contract } from '../../../modules/contracts/domain/contract';
import { userService } from '../../../modules/users/infrastructure/user.service';
import { User } from '../../../modules/users/domain/user';

export const useSearchByIdContract = (contractId: string) => {
    const [contract, setContract] = useState<Contract | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await contractService.searchById<Contract>(contractId);
            const clientId = typeof response?.client === "string" ? response.client : response?.client?.id
            const client = await userService.searchById<User
            >(clientId);
            setContract({ ...response, client });
        } catch (error) {
            setContract(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [contractId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        contract,
        isLoading,
        error,
        handleRefetch
    };
};

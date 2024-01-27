import { useState, useEffect } from 'react';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { Contract } from '../../../modules/contracts/domain/contract';

export const useSearchByIdContract = (contractId: string) => {
    const [contract, setContract] = useState<Contract | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await contractService.searchById<Contract>(contractId);
            setContract(response);
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

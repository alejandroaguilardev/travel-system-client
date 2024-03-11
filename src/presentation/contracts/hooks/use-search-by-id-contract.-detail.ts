import { useState, useEffect } from 'react';
import { ContractDetail } from '../../../modules/contracts/domain/contract-detail';
import axios from 'axios';
import { HOST_API } from '../../../app/config/config-global';
import { endpoints } from '../../../modules/shared/domain/endpoint';

export const useSearchByIdContractDetail = (contractId: string, contractDetailId: string, token: string) => {
    const [contractDetail, setContract] = useState<ContractDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {

            const axiosInstance = axios.create({ baseURL: HOST_API });
            const { data } = await axiosInstance.get(`${endpoints.contracts.detail}/${contractId}/${contractDetailId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setContract(data);
        } catch (error) {
            setContract(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [contractDetailId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        contractDetail,
        isLoading,
        error,
        handleRefetch
    };
};

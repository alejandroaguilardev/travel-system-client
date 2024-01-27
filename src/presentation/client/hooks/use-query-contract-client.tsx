'use client';

import useSWR from 'swr';
import { endpoints } from '../../../modules/shared/domain/endpoint';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { useAuthContext } from '../../auth/hooks/use-auth-context';


export const useQueryContract = () => {
    const { user } = useAuthContext();

    const { data, error, isLoading } = useSWR(
        [endpoints.contracts.root, user?.id],
        () => contractService.searchClientById(user?.id ?? "")
    );

    return {
        contract: data ?? [],
        error,
        isLoading
    }
}

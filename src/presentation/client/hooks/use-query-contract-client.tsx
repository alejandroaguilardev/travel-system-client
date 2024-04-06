import useSWR from 'swr';
import { endpoints } from '../../../modules/shared/domain/endpoint';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';


export const useQueryContract = () => {
    const { data, error, isLoading } = useSWR(
        endpoints.contracts.root,
        () => contractService.searchClientById(),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    );

    return {
        contract: data ?? [],
        error,
        isLoading
    }
}

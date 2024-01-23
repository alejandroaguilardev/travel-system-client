import useSWR from "swr";
import { endpoints } from '../../../modules/shared/domain/endpoint';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { Contract } from '../../../modules/contracts/domain/contract';

export const useSearchByIdContract = (contractId: string) => {
    const { data, error, isLoading, mutate } = useSWR([endpoints.contracts, contractId], () => contractService.searchById<Contract>(contractId)
    )

    const handleRefetch = () => mutate();
    return {
        contract: data,
        isLoading,
        error,
        handleRefetch
    }
}

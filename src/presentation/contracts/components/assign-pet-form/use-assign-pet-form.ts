import { useEffect, useState } from 'react'
import { Contract } from '../../../../modules/contracts/domain/contract'
import { useMessage } from '../../../../hooks'
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';

export const useAssignPetForm = (contract: Contract) => {
    const { showNotification } = useMessage();
    const [details, setDetails] = useState<ContractDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (contract?.details && contract?.id) {
            setIsLoading(true);
            Promise
                .all(
                    contract?.details?.map(_ => contractDetailService.searchById(contract.id, _.id))
                )
                .then(response => {
                    setDetails(response)
                })
                .catch(() => {
                    showNotification("No se logró consultar el contrato, comunicarse con soporte")
                    setDetails([])
                }).finally(() => {
                    setIsLoading(false);
                })
        }
    }, [contract?.details, contract?.id])


    return {
        details,
        isLoading
    }
}

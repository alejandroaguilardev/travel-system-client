import { ResponseSuccess } from '../../../../modules/shared/domain/response/response-success';
import { ContractService } from '../../domain/contract.service';

export const FolderUpdater = (contractService: ContractService) => async (contractId: string, folder: string, number: string): Promise<ResponseSuccess> => {


    const response = await contractService.updateFolder(contractId, folder, number);
    return response;
}
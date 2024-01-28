import { useMessage } from '../../../../hooks/use-message';
import { useContractStore } from '../../../../state/contract/contract-store';
import { contractService } from '../../../../modules/contracts/infrastructure/contract.service';
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { contractFinish } from '../../../../modules/contracts/application/finish/contrac-finish';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';

export const useHeader = () => {
    const { showNotification } = useMessage();
    const { contract, onSelected } = useContractStore();

    const handleFinishClick = async () => {
        if (!contract?.id) {
            showNotification("No hay contrato seleccionado");
            return;
        }

        try {
            const response = await contractFinish(contractService, uuid)(contract.id)
            showNotification(response.message);
            onSelected(null);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }

    };

    return {
        handleFinishClick
    }
}

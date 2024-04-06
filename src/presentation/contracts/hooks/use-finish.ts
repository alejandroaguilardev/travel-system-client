import { useMessage } from '../../../hooks/use-message';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import uuid from "../../../modules/shared/infrastructure/adapter/uuid";
import { contractFinish } from '../../../modules/contracts/application/finish/contract-finish';
import { errorsShowNotification } from '../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { Contract } from '../../../modules/contracts/domain/contract';

type Props = {
    contract: Contract | null;
    callback?: VoidFunction;
    setLoading?: (isLoading: boolean) => void;
}

export const useFinish = ({ contract, callback, setLoading }: Props) => {
    const { showNotification } = useMessage();

    const handleFinishClick = async () => {
        if (!contract?.id) {
            showNotification("No hay contrato seleccionado");
            return;
        }
        if (setLoading) setLoading(true);

        try {
            const response = await contractFinish(contractService, uuid)(contract.id)
            showNotification(response.message);
            if (callback) callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        } finally {
            if (setLoading) setLoading(false);
        }

    };

    return {
        handleFinishClick
    }
}

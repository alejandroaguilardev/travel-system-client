import { useMessage } from '../../../hooks/use-message';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import uuid from "../../../modules/shared/infrastructure/adapter/uuid";
import { contractCancel } from '../../../modules/contracts/application/finish/contract-cancel';
import { errorsShowNotification } from '../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { Contract } from '../../../modules/contracts/domain/contract';

type Props = {
    contract: Contract | null;
    callback?: VoidFunction
    setLoading: (isLoading: boolean) => void;
}

export const useCancel = ({ contract, callback, setLoading }: Props) => {
    const { showNotification } = useMessage();

    const handleCancelClick = async () => {
        if (!contract?.id) {
            showNotification("No hay contrato seleccionado");
            return;
        }
        setLoading(true)

        try {
            const response = await contractCancel(contractService, uuid)(contract.id)
            showNotification(response.message);
            if (callback) callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        } finally {
            setLoading(false)
        }

    };

    return {
        handleCancelClick
    }
}

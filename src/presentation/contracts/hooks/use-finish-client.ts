import { useMessage } from '../../../hooks/use-message';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import uuid from "../../../modules/shared/infrastructure/adapter/uuid";
import { errorsShowNotification } from '../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { Contract } from '../../../modules/contracts/domain/contract';
import { contractFinishClient } from '../../../modules/contracts/application/finish/contract-finish-client';
import { useRouter } from '../../../app/routes/hooks/use-router';

type Props = {
    contract: Contract | null;
    callback?: VoidFunction;
    setLoading?: (isLoading: boolean) => void;
}

export const useFinishClient = ({ contract, callback, setLoading }: Props) => {
    const { showNotification } = useMessage();
    const { reload } = useRouter()

    const handleFinishClick = async () => {
        if (!contract?.id) {
            showNotification("No hay contrato seleccionado");
            return;
        }
        if (setLoading) setLoading(true);

        try {
            const response = await contractFinishClient(contractService, uuid)(contract.id)
            showNotification(response.message);
            reload();
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

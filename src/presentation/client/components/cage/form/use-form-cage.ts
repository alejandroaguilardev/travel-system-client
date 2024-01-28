import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { CageDefinition } from '../../../../../modules/contracts/domain/interfaces/cage';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { contractService } from '../../../../../modules/contracts/infrastructure/contract.service';
import { cageUpdater } from '../../../../../modules/contracts/application/update/cage-updater';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { useContractStore } from '../../../../../state/contract/contract-store';

type Props = {
    contractId: string;
    callback: VoidFunction
}

export const useFormCage = ({ contractId, callback }: Props) => {
    const { showNotification } = useMessage();
    const { onSelected } = useContractStore();

    const onSubmit: SubmitHandler<CageDefinition> = async (data) => {
        try {
            const response = await cageUpdater(contractService, uuid)(contractId, data)
            showNotification("Actualizado correctamente ");
            onSelected(response);
            callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

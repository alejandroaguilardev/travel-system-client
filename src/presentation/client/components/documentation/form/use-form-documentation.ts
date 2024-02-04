import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { contractService } from '../../../../../modules/contracts/infrastructure/contract.service';
import { documentationUpdater } from '../../../../../modules/contracts/application/update/documentation-updater';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { useContractStore } from '../../../../../state/contract/contract-store';

type Props = {
    contractId: string;
    callback: VoidFunction
}

export const useFormDocumentation = ({ contractId, callback }: Props) => {
    const { showNotification } = useMessage();
    const { onSelected } = useContractStore();

    const onSubmit: SubmitHandler<Documentation> = async (data) => {
        try {
            const response = await documentationUpdater(contractService, uuid)(contractId, data)
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

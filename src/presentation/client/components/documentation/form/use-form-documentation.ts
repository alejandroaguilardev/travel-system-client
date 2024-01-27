import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { DocumentationDefinition } from '../../../../../modules/contracts/domain/interfaces/documentation';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { contractService } from '../../../../../modules/contracts/infrastructure/contract.service';
import { documentationClientUpdater } from '../../../../../modules/contracts/application/update/documentation-client-updater';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { useContractStore } from '../../../../../state/contract/contract-store';

type Props = {
    contractId: string;
    callback: VoidFunction
}

export const useFormDocumentation = ({ contractId, callback }: Props) => {
    const { showNotification } = useMessage();
    const { onSelected } = useContractStore();

    const onSubmit: SubmitHandler<DocumentationDefinition> = async (data) => {
        try {
            const response = await documentationClientUpdater(contractService, uuid)(contractId, data)
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

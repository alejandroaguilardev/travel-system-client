import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { contractService } from '../../../../../modules/contracts/infrastructure/contract.service';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { useContractStore } from '../../../../../state/contract/contract-store';
import { travelUpdater } from '../../../../../modules/contracts/application/update/travel-updater';
import { PartialTravelDefinition } from '../../../../../modules/contracts/domain/interfaces/travel';

type Props = {
    contractId: string;
    callback: VoidFunction
}

export const useFormTravel = ({ contractId, callback }: Props) => {
    const { showNotification } = useMessage();
    const { onSelected } = useContractStore();

    const onSubmit: SubmitHandler<PartialTravelDefinition> = async (data) => {
        try {
            const response = await travelUpdater(contractService, uuid)(contractId, data)
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

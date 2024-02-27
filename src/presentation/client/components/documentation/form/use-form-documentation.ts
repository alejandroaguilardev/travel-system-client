import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { documentationUpdater } from '../../../../../modules/contracts/application/update/documentation-updater';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    detailId: string;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useFormDocumentation = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<Documentation> = async (data) => {
        try {
            const response = await documentationUpdater(contractDetailService, uuid)(contractId, detailId, data)
            showNotification("Actualizado correctamente ");
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

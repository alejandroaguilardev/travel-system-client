import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { cageUpdater } from '../../../../../modules/contracts/application/update/cage-updater';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    detailId: string;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useFormCage = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<Cage> = async (data) => {
        try {
            const response = await cageUpdater(contractDetailService, uuid)(contractId, detailId, data)
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

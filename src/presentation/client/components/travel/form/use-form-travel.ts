import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { travelUpdater } from '../../../../../modules/contracts/application/update/travel-updater';
import { PartialTravel } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    detailId: string;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useFormTravel = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<PartialTravel> = async (data) => {
        if (data.typeTraveling === "charge" && !data.guideNumber) {
            showNotification("Debe indicar el número de guía", { variant: "error" })
            return;
        }
        try {
            const response = await travelUpdater(contractDetailService, uuid)(contractId, detailId, data)
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

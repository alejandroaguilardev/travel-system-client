import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { ChipReviewContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractChipReviewUpdater } from "../../../../../modules/contracts/application/topico/chip-review-updater";

type Props = {
    contractId: string;
    detailId: string;
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormChipReview = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);

    const onSubmit: SubmitHandler<ChipReviewContract> = async (data) => {
        try {
            const response = await contractChipReviewUpdater(contractDetailService)(contractId, detailId, data)
            showNotification("Actualizado correctamente ");
            setsExecuted(true);
            setTimeout(() => callback(response), 100)
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        onSubmit,
    }
}

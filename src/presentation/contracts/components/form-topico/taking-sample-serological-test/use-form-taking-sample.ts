import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { TakingSampleSerologicalTestContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractTakingSampleUpdater } from "../../../../../modules/contracts/application/topico/taking-sample-updater";

type Props = {
    contractId: string;
    detailId: string;
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormTakingSampleSerologicalTestContract = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);
    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail();

    const onSubmit: SubmitHandler<TakingSampleSerologicalTestContract> = async (data) => {
        try {
            const response = await contractTakingSampleUpdater(contractDetailService)(contractId, detailId, data)
            showNotification("Actualizado correctamente ");
            if (hasSendEmail) {
                contractDetailService.mailTravelDetail(contractId, detailId);
                contractDetailService.mailTakingSampleExecuted(contractId, detailId);
            }
            setsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        hasSendEmail,
        onSubmit,
        onChangeHasSendEmail
    }
}

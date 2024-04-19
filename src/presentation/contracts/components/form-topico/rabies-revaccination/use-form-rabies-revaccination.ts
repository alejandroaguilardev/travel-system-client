import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { RabiesReVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractRabiesReVaccinationUpdater } from "../../../../../modules/contracts/application/topico/rabies-revaccination-updater";

type Props = {
    contractId: string;
    detailId: string;
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormRabiesReVaccination = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);
    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail();

    const onSubmit: SubmitHandler<RabiesReVaccinationContract> = async (data) => {
        try {
            const response = await contractRabiesReVaccinationUpdater(contractDetailService)(contractId, detailId, data)
            showNotification("Actualizado correctamente ");
            if (hasSendEmail) {
                contractDetailService.mailDetail(contractId, detailId);
            }
            setsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        onSubmit,
        hasSendEmail,
        onChangeHasSendEmail
    }
}

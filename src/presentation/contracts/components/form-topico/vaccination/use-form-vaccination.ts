import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractVaccinationUpdater } from "../../../../../modules/contracts/application/topico/vaccunation-updater";

type Props = {
    contractId: string;
    detailId: string;
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormVaccination = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);

    const onSubmit: SubmitHandler<VaccinationContract> = async (data) => {
        try {
            const response = await contractVaccinationUpdater(contractDetailService)(contractId, detailId, data)
            showNotification("Actualizado correctamente ");
            setsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        onSubmit,
    }
}

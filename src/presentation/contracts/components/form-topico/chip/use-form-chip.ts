import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { petService } from "../../../../../modules/pets/infrastructure/pets.service";
import { contractChipUpdater } from '../../../../../modules/contracts/application/topico/chip-updater';

type Props = {
    contractId: string;
    detailId: string;
    petId: string;
    callback: (response: ContractDetailUpdateResponse) => void
}

export const useFormChip = ({ contractId, detailId, petId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);

    const onSubmit: SubmitHandler<VaccinationContract> = async (data) => {
        try {
            const response = await contractChipUpdater(contractDetailService, petService)(contractId, detailId, petId, data)
            showNotification("Actualizado correctamente ");
            callback(response);
            setsExecuted(true);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
        isExecuted,
    }
}

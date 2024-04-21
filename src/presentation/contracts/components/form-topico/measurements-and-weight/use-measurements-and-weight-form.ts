import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { petService } from "../../../../../modules/pets/infrastructure/pets.service";
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { measurementsAndWeightUpdater } from "../../../../../modules/pets/application/update/measurements-and-weight-updater";
import { Pet, TopicoMeasurementsAndWeight } from "../../../../../modules/pets/domain/pet";
import { useState } from "react";
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';

type Props = {
    petId: string;
    contractId: string;
    contractDetailId: string;
    callback: (pet: Pet) => void;
}

export const useMeasurementsAndWeightForm = ({ petId, contractId, contractDetailId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);
    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail();

    const onSubmit: SubmitHandler<TopicoMeasurementsAndWeight> = async (data) => {
        try {
            const response = await measurementsAndWeightUpdater(petService, uuid)(petId, data);

            showNotification("Actualizado correctamente ");
            callback(response);
            setsExecuted(true);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        hasSendEmail,
        onChangeHasSendEmail,
        onSubmit,
    }
}

import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { petService } from "../../../../../modules/pets/infrastructure/pets.service";
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { measurementsAndWeightUpdater } from "../../../../../modules/pets/application/update/measurements-and-weight-updater";
import { TopicoMeasurementsAndWeight } from "../../../../../modules/pets/domain/pet";
import { useState } from "react";

type Props = {
    petId: string;
    callback: () => void
}

export const useMeasurementsAndWeightForm = ({ petId, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);

    const onSubmit: SubmitHandler<TopicoMeasurementsAndWeight> = async (data) => {
        try {
            const response = await measurementsAndWeightUpdater(petService, uuid)(petId, data)
            showNotification("Actualizado correctamente ");
            callback();
            setsExecuted(true);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        onSubmit,
    }
}

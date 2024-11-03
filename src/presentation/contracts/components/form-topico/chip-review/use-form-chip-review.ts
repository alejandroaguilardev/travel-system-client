import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { ChipReviewContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractChipReviewUpdater } from "../../../../../modules/contracts/application/topico/chip-review-updater";
import { contractChipUpdater } from '../../../../../modules/contracts/application/topico/chip-updater';
import { petService } from '../../../../../modules/pets/infrastructure/pets.service';
import { Pet } from '../../../../../modules/pets/domain/pet';

type Props = {
    contractId: string;
    detailId: string;
    pet?: Pet;
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormChipReview = ({ contractId, detailId, pet, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);
    const [chip, setChip] = useState(pet?.chip ?? "");
    const [chipDate, setChipDate] = useState(pet?.chipDate ?? null);

    const onSubmit: SubmitHandler<ChipReviewContract> = async (data) => {
        try {
            const response = await contractChipReviewUpdater(contractDetailService)(contractId, detailId, data);
            if (pet?.id && chipDate) {
                await petService.updateChip(pet.id, chip, chipDate);
            }

            showNotification("Actualizado correctamente ");
            setsExecuted(true);
            setTimeout(() => callback(response), 100)
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        chip,
        chipDate,
        onSubmit,
        setChip,
        setChipDate
    }
}

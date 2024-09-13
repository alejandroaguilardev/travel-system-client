import { SubmitHandler } from "react-hook-form";
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewPet, Pet } from '../../../../modules/pets/domain/pet';
import { petCreator } from '../../../../modules/pets/application/create/pet-creator';
import { petService } from '../../../../modules/pets/infrastructure/pets.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { petUpdater } from '../../../../modules/pets/application/update/pet-updater';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { useState } from "react";

type Props = {
    callback: (petUpdated: Pet) => void;
}

export const useFormPet = ({ callback }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { reload } = useRouter();
    const { showNotification, showSuccess } = useMessage();

    const onSubmit: SubmitHandler<NewPet> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        setIsSubmitting(true);
        try {
            const { response, pet: petUpdated } = data?.id
                ? await petUpdater(petService, uuid)(data?.id!, data as Pet)
                : await petCreator(petService, uuid)(data)
            showSuccess({ newTitle: response.message })
            callback(petUpdated);
            nativeEvent.submitter?.value === "reload" && setTimeout(() => reload(), 1500)

        } catch (error) {
            errorsShowNotification(error, showNotification)
        } finally {
            setTimeout(() => setIsSubmitting(false), 1000);
        }
    };

    return {
        isSubmitting,
        onSubmit,
    }
}

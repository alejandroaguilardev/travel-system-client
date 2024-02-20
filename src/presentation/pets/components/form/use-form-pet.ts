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

type Props = {
    pet?: Pet;
    callback: () => void;
}

export const useFormPet = ({ pet, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<NewPet> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const response = pet
                ? await petUpdater(petService, uuid)(data?.id!, data)
                : await petCreator(petService, uuid)(data)

            showNotification(response.message);
            nativeEvent.submitter?.value === "reload"
                ? reload()
                : callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

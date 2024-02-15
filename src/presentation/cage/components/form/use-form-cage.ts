import { SubmitHandler } from "react-hook-form";
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewCage, Cage } from '../../../../modules/cages/domain/cage';
import { cageCreator } from '../../../../modules/cages/application/create/cage-creator';
import { cageService } from '../../../../modules/cages/infrastructure/cages.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { cageUpdater } from '../../../../modules/cages/application/update/cage-updater';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';

type Props = {
    cage?: Cage;
    callback: () => void;
}

export const useFormCage = ({ cage, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<NewCage> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const response = cage
                ? await cageUpdater(cageService, uuid)(data?.id!, data)
                : await cageCreator(cageService, uuid)(data)

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

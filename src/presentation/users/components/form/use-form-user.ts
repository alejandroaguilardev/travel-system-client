import { SubmitHandler } from "react-hook-form";
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewUser } from '../../../../modules/users/domain/user';
import { userCreator } from '../../../../modules/users/application/create/user-creator';
import { userService } from '../../../../modules/users/infrastructure/user.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { userUpdater } from '../../../../modules/users/application/update/user-updater';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';

type Props = {
    user?: NewUser;
    callback: (user?: NewUser) => void;
}

export const useFormUser = ({ user, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification, showSuccess } = useMessage();

    const onSubmit: SubmitHandler<NewUser> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const { response, user: newUser } = user
                ? await userUpdater(userService, uuid)(data?.id!, data)
                : await userCreator(userService, uuid)(data);

            showSuccess({ newTitle: response.message })
            nativeEvent.submitter?.value === "reload"
                ? setTimeout(() => reload(), 1500)
                : callback(newUser);

        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

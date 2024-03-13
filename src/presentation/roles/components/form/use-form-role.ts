import { SubmitHandler } from "react-hook-form";
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewRole } from '../../../../modules/roles/domain/role';
import { roleCreator } from '../../../../modules/roles/application/create/role-creator';
import { roleService } from '../../../../modules/roles/infrastructure/role.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { roleUpdater } from '../../../../modules/roles/application/update/role-updater';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';

type Props = {
    role?: NewRole;
    callback: () => void;
}

export const useFormRole = ({ role, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification, showSuccess } = useMessage();

    const onSubmit: SubmitHandler<NewRole> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const response = role
                ? await roleUpdater(roleService, uuid)(data?.id!, data)
                : await roleCreator(roleService, uuid)(data)

            showNotification(response.message);
            nativeEvent.submitter?.value === "reload"
                ? reload()
                : callback();

            showSuccess({ newTitle: response.message })
            nativeEvent.submitter?.value === "reload"
                ? setTimeout(() => reload(), 1500)
                : callback();


        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

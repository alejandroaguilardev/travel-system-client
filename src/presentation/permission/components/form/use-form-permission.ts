import { SubmitHandler } from "react-hook-form";
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewPermission, Permission } from '../../../../modules/permissions/domain/permission';
import { permissionCreator } from '../../../../modules/permissions/application/create/permission-creator';
import { permissionService } from '../../../../modules/permissions/infrastructure/permission.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { permissionUpdater } from '../../../../modules/permissions/application/update/permission-updater';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';

type Props = {
    permission?: Permission;
    callback: () => void;
}

export const useFormPermission = ({ permission, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<NewPermission> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const response = permission
                ? await permissionUpdater(permissionService, uuid)(data?.id!, data)
                : await permissionCreator(permissionService, uuid)(data)

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

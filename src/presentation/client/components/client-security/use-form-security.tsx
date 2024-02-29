import { SubmitHandler } from "react-hook-form";
import { userService } from '../../../../modules/users/infrastructure/user.service';
import { useMessage } from '../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { ChangePasswordSchema } from "./client-security-form-validation";
import { userSecurity } from '../../../../modules/users/application/security/profile-security';

type Props = {
    callback: () => void;
}

export const useFormClientSecurity = ({ callback }: Props) => {
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
        try {
            const response = await userSecurity(userService)(data.password, data.newPassword)
            showNotification(response.message);
            callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

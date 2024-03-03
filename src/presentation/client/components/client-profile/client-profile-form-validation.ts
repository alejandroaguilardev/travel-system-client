import * as Yup from 'yup';
import { ProfileClient } from '../../../../modules/users/domain/user-profile.interface';


export const defaultValues = {
    phone: "",
};

export const profileSchema: Yup.ObjectSchema<ProfileClient> = Yup.object().shape({
    phone: Yup.string().required("El teléfono es requerido"),

});

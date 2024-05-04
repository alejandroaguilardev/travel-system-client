import * as Yup from 'yup';
import { ChipContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { chipValidationYup } from '../../../../pets/components/form/pet-validations';



export const defaultChip = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',

};

export const chipObjectSchema: Yup.ObjectSchema<ChipContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: chipValidationYup.test(
        'is-true',
        'El chip es requerido',
        function (value) {
            const { executed } = this.parent;
            if (!value && executed) return false;
            return true
        }
    ),
    observation: Yup.string(),
    user: Yup.string(),
});

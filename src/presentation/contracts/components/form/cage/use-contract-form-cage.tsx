import { useFormContext } from 'react-hook-form';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';
import { Cage } from '../../../../../modules/cages/domain/cage';

export const useContractFormCage = ({ keyValue = "cage.chosen" }: { keyValue?: string }) => {
    const { setValue, getValues } = useFormContext();
    const { user } = useAuthContext();
    const cage = getValues(keyValue);

    const handleCageChosen = (cage: Cage | null) => {
        setValue(keyValue, {
            modelCage: cage?.modelCage ?? "",
            dimensionsCage: cage?.dimensionsCage ?? "",
            typeCage: cage?.typeCage ?? "",
            user: user?.id
        }, { shouldValidate: true });
    }
    return {
        cage,
        handleCageChosen
    }
}

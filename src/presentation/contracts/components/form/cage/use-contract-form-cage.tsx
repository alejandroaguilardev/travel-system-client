import { useFormContext } from 'react-hook-form';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';
import { Cage } from '../../../../../modules/cages/domain/cage';

export const useContractFormCage = ({ keyValue = "cage.chosen" }: { keyValue?: string }) => {
    const { setValue } = useFormContext();
    const { user } = useAuthContext();


    const handleCageChosen = (cage: Cage | null) => {
        setValue(keyValue, {
            modelCage: cage?.modelCage ?? "",
            dimensionsCage: cage?.dimensionsCage ?? "",
            typeCage: cage?.typeCage ?? "",
            user: user?.id
        }, { shouldValidate: true });
    }
    return {
        handleCageChosen
    }
}

import { useFormContext } from 'react-hook-form';
import { CageChosen } from '../../../../../modules/contracts/domain/contract-services/cage/cage-chosen';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';

export const useContractFormCage = () => {
    const { setValue } = useFormContext();
    const { user } = useAuthContext();


    const handleCageChosen = (value: string, keyValue = "cage.chosen") => {
        const cage = JSON.parse(value) as CageChosen;
        setValue(keyValue, {
            modelCage: cage.modelCage,
            dimensionsCage: cage.dimensionsCage,
            typeCage: cage.typeCage,
            user: user?.id
        });
    }
    return {
        handleCageChosen
    }
}

import { useFormContext } from 'react-hook-form';
import { CageChosen } from '../../../../../modules/contracts/domain/cage/cage-chosen';

export const useContractFormCage = () => {
    const { setValue } = useFormContext();


    const handleCageChosen = (value: string, keyValue = "cage.chosen") => {
        const cage = JSON.parse(value) as CageChosen;
        setValue(keyValue, {
            modelCage: cage.modelCage,
            dimensionsCage: cage.dimensionsCage,
            typeCage: cage.typeCage,
        });

    }
    return {
        handleCageChosen,
    }
}

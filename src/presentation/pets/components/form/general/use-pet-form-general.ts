
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';

export const usePetFormGeneral = () => {
    const { setValue, watch } = useFormContext();
    const chip = watch("chip");
    const birthDate = fDate(watch("birthDate"), 'yyyy-MM-dd');
    const chipDate = fDate(watch("chipDate"), 'yyyy-MM-dd');

    useEffect(() => {
        if (!chip) {
            setValue("chipDate", null);
        }
    }, [chip])

    return {
        chip,
        birthDate,
        chipDate
    }
}

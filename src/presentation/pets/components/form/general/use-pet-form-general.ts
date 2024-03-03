
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { User } from '../../../../../modules/users/domain/user';
import { userService } from '../../../../../modules/users/infrastructure/user.service';

export const usePetFormGeneral = () => {
    const { setValue, watch, getValues } = useFormContext();
    const chip = watch("chip");
    const birthDate = fDate(watch("birthDate"), 'yyyy-MM-dd');
    const chipDate = fDate(watch("chipDate"), 'yyyy-MM-dd');

    const [client, setClient] = useState<User | null>(null);
    const clientDefault: string = getValues("adopter");


    const handleClient = (value: User | null) => {
        setClient(value as User | null);
        setValue("adopter", value?.id ?? "");
    }


    useEffect(() => {
        if (clientDefault) {
            userService.searchById<User>(clientDefault)
                .then(response => setClient(response))
                .catch(() => setClient(null));
        }
    }, [clientDefault])

    useEffect(() => {
        if (!chip) {
            setValue("chipDate", null);
        }
    }, [chip])

    return {
        chip,
        client,
        handleClient,
        birthDate,
        chipDate,
    }
}

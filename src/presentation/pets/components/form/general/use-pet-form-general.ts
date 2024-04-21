
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { User } from '../../../../../modules/users/domain/user';
import { userService } from '../../../../../modules/users/infrastructure/user.service';

export const usePetFormGeneral = () => {
    const { setValue, watch, getValues } = useFormContext();
    const [hasChip, setHasChip] = useState(false);
    const chip = watch("chip");
    const birthDate: Date = fDayjs(watch("birthDate"));
    const chipDate: Date = fDayjs(watch("chipDate"));

    const [client, setClient] = useState<User | null>(null);
    const clientDefault: string = getValues("adopter");


    const handleClient = (value: User | null) => {
        setClient(value as User | null);
        setValue("adopter", value?.id ?? "");
    }

    const handleChip = (value: boolean) => {
        setHasChip(value);
        if (!value) {
            setValue("chipDate", null);
            setValue("chip", "");
        }
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
    }, [chip]);

    useEffect(() => {
        if (chip) setHasChip(true);
    }, [hasChip])

    return {
        chip,
        client,
        handleClient,
        birthDate,
        chipDate,
        hasChip,
        handleChip,
    }
}

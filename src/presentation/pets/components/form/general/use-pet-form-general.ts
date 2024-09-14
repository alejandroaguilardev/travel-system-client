
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { User } from '../../../../../modules/users/domain/user';
import { userService } from '../../../../../modules/users/infrastructure/user.service';
import { MeasurementsAndWeight } from '../../../../../modules/pets/domain/pet-measurements-and-weight';

export const usePetFormGeneral = () => {
    const { setValue, watch, getValues } = useFormContext();
    const chip = watch("chip");
    const type = watch("type");
    const id = watch("id");
    const name = watch("name");
    const image: string = watch("image");
    const birthDate: Date = fDayjs(watch("birthDate"));
    const chipDate: Date = fDayjs(watch("chipDate"));
    const { updatedAt: dateUpdatedAt }: MeasurementsAndWeight = watch("measurementsAndWeight");

    const [client, setClient] = useState<User | null>(null);
    const clientDefault: string = getValues("adopter");


    const handleClient = (value: User | null) => {
        setClient(value as User | null);
        setValue("adopter", value?.id ?? "");
    }

    const handleChip = (value: boolean) => {
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


    return {
        id,
        type,
        chip,
        client,
        birthDate,
        chipDate,
        image,
        dateUpdatedAt,
        name,
        handleClient,
        handleChip,
    }
}

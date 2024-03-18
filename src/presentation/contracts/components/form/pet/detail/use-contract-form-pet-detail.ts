import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';


type Props = {
    field: string;
}

export const useContractFormPetDetail = ({ field }: Props) => {
    const { setValue, watch } = useFormContext();

    const travel = watch(`${field}travel.hasServiceIncluded`);
    const typeTraveling = watch(`${field}travel.typeTraveling`);
    const cage = watch(`${field}cage.hasServiceIncluded`);


    const handleCountry = (value: string) => setValue(`${field}travel.destination.countryDestination`, value);
    const country = watch(`${field}travel.destination.countryDestination`) || null;


    useEffect(() => {
        if (travel && typeTraveling === "accompanied") {
            setValue(`${field}travel.typeTraveling`, "charge");
            return;
        }
    }, [travel, typeTraveling])

    useEffect(() => {
        if (travel) {
            setValue(`${field}travel.hasServiceAccompanied`, false)
        } else {
            setValue(`${field}travel.typeTraveling`, "accompanied")
        }
    }, [travel])

    useEffect(() => {
        if (!cage) {
            setValue(`${field}cage.chosen`, {
                modelCage: "",
                dimensionsCage: "",
                typeCage: "",
                user: "",
            });
        }
    }, [cage])

    return {
        cage,
        travel,
        country,
        handleCountry,
    }
}

import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClientPetsResponse, NewPet, Pet } from '../../../../../modules/pets/domain/pet';
import { PetFormGeneral } from '../../../../pets/components/form/general/pet-form-general';
import { useFormPet } from '../../../../pets/components/form/use-form-pet';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from '@mui/material';
import { petSchemaTopic, defaultValuesTopic } from '../../../../pets/components/form/pet-validations';
import { SelectPetExist } from "./select-pet-exist";
import { petUpdaterFormat } from '../../../../../modules/pets/application/update/pet-updater';
import { petService } from '../../../../../modules/pets/infrastructure/pets.service';

type Props = {
    adopterId: string;
    pet?: Pet;
    callback: (response: Pet) => void;
    onCancel: () => void;
}

export const PetSelectedTopic: FC<Props> = ({ pet, callback, adopterId, onCancel }) => {

    const methods = useForm({
        resolver: yupResolver<NewPet>(petSchemaTopic),
        defaultValues: pet ?? { ...defaultValuesTopic, adopter: adopterId },
    });

    const { onSubmit, isSubmitting } = useFormPet({ callback });
    const [petsClient, setPetsClient] = useState<ClientPetsResponse[]>([]);

    const handleChangePet = (value: Pet | null): void => {
        methods.reset(value ? petUpdaterFormat(value) : { ...defaultValuesTopic, adopter: adopterId });
    }

    useEffect(() => {
        petService.searchClientPets(adopterId)
            .then((response) => setPetsClient(response))
            .catch(() => setPetsClient([]))
    }, [])



    return (
        <>
            <SelectPetExist clientId={adopterId} handleSelected={handleChangePet} petsClient={petsClient} />

            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <PetFormGeneral hasMeasurementsAndWeight hasRecommendation hasShowChip petsClient={petsClient} />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth >
                        {pet?.id ? "Actualizar" : "Crear Mascota"}
                    </Button>

                </Box>
            </FormProvider>
        </>
    )
}

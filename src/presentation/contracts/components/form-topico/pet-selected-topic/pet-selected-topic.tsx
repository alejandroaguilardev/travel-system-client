import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewPet, Pet } from '../../../../../modules/pets/domain/pet';
import { PetFormGeneral } from '../../../../pets/components/form/general/pet-form-general';
import { useFormPet } from '../../../../pets/components/form/use-form-pet';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from '@mui/material';
import { petSchemaTopic, defaultValuesTopic } from '../../../../pets/components/form/pet-validations';
import { SelectPetExist } from "./select-pet-exist";

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

    const { onSubmit } = useFormPet({ pet, callback });

    const handleChangePet = (value: Pet | null): void => {
        methods.reset(value ?? { ...defaultValuesTopic, adopter: adopterId });
    }


    return (
        <>
            <SelectPetExist clientId={adopterId} handleSelected={handleChangePet} />

            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <PetFormGeneral hasMeasurementsAndWeight hasRecommendation />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        Actualizar
                    </Button>

                </Box>
            </FormProvider>
        </>
    )
}

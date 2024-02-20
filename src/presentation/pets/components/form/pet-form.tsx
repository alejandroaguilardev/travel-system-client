import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { NewPet, Pet } from '../../../../modules/pets/domain/pet';
import { useFormPet } from "./use-form-pet";
import { tabs } from "./tabs";
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { defaultValues, petSchema } from "./pet-validations";

type Props = {
    pet?: Pet;
    callback: () => void;
}

export const PetForm: FC<Props> = ({ pet, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewPet>(petSchema),
        defaultValues: pet ?? defaultValues,
    });

    const { onSubmit } = useFormPet({ pet, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>

            <ActionsButtonsForm
                name="Mascota"
                edit={!!pet}
            />

        </FormProvider >
    )
}

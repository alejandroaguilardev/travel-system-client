import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { NewPet, Pet } from '../../../../modules/pets/domain/pet';
import { useFormPet } from "./use-form-pet";
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { defaultValues, petSchema } from "./pet-validations";
import { ClientDialogProvider } from '../../../client/components/search-client/client-dialog-context';
import { ClientDialogForm } from '../../../client/components/search-client/client-dialog-form';
import { PetFormGeneral } from "./general/pet-form-general";

type Props = {
    pet?: Pet;
    adopterId?: string;
    callback: (petUpdated: Pet) => void;
    notReload?: boolean;
    onCancel?: VoidFunction
}

export const PetForm: FC<Props> = ({ pet, adopterId, notReload, callback, onCancel }) => {
    const methods = useForm({
        resolver: yupResolver<NewPet>(petSchema),
        defaultValues: pet ?? { ...defaultValues, adopter: adopterId ?? defaultValues.adopter },
    });

    const { onSubmit } = useFormPet({ callback });


    const tabs = [
        {
            value: "Datos Generales",
            component: <PetFormGeneral hasClient hasShowChip hasImage />
        },
    ]

    return (
        <ClientDialogProvider clientId={adopterId} >
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <TabGenericProvider defaultValue={tabs[0].value}>
                    <TabSwitcher
                        tabs={tabs}
                    />
                </TabGenericProvider>

                <ActionsButtonsForm
                    name="Mascota"
                    edit={!!pet}
                    notReload={notReload}
                    onCancel={onCancel}
                />

            </FormProvider>
            <ClientDialogForm />
        </ClientDialogProvider>
    )
}

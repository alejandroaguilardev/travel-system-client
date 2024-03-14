import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { NewFolder, Folder } from '../../../../modules/folders/domain/folder';
import { useFormFolder } from "./use-form-folder";
import { tabs } from "./tabs";
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { defaultValues, folderSchema } from "./folder-validations";

type Props = {
    folder?: Folder;
    callback: () => void
}

export const FolderForm: FC<Props> = ({ folder, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewFolder>(folderSchema),
        defaultValues: folder ?? defaultValues,
    });

    const { onSubmit } = useFormFolder({ folder, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>

            <ActionsButtonsForm
                name="expediente"
                edit={!!folder}
            />

        </FormProvider >
    )
}

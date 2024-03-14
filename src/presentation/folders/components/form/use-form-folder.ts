import { SubmitHandler } from "react-hook-form";
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewFolder, Folder } from '../../../../modules/folders/domain/folder';
import { folderCreator } from '../../../../modules/folders/application/create/folder-creator';
import { folderService } from '../../../../modules/folders/infrastructure/folders.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { folderUpdater } from '../../../../modules/folders/application/update/folder-updater';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';

type Props = {
    folder?: Folder;
    callback: () => void;
}

export const useFormFolder = ({ folder, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification, showSuccess } = useMessage();

    const onSubmit: SubmitHandler<NewFolder> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const response = folder
                ? await folderUpdater(folderService, uuid)(data?.id!, data)
                : await folderCreator(folderService, uuid)(data)

            showSuccess({ newTitle: response.message })
            nativeEvent.submitter?.value === "reload"
                ? setTimeout(() => reload(), 1500)
                : callback();

        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}

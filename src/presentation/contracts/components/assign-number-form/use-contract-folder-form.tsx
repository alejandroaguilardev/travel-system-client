import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Folder } from '../../../../modules/folders/domain/folder';

export const useContractFolderForm = () => {
    const { setValue, getValues } = useFormContext();
    const [folder, setFolder] = useState<Folder | null>(null);

    const number: number = getValues("number");

    const handleFolder = (value: Folder | null) => {
        setFolder(value as Folder | null);
        setValue("folder", value?.name ?? "");
    }

    const handleNumber = (value?: number) => {
        setValue("number", value ?? 0);
    }

    return {
        folder,
        number,
        handleFolder,
        handleNumber
    }
}

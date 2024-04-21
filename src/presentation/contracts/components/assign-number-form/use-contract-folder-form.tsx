import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Folder } from '../../../../modules/folders/domain/folder';

export const useContractFolderForm = () => {
    const { setValue, getValues } = useFormContext();
    const [folder, setFolder] = useState<Folder | string | null>(null);

    const number: number = getValues("number");

    const handleFolder = (value: Folder | string | null) => {
        const update = typeof value === "string" ? value : value?.name;
        console.log({ value })
        console.log({ update })
        setFolder(value);
        setValue("folder", update ?? "");
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

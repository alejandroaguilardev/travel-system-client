import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export const useContractFolderForm = () => {
    const { setValue, watch } = useFormContext();

    const folder: string = watch("folder");
    const number: number = watch("number");

    const [quantity, setQuantity] = useState<any>([]);
    const handleQuantity = (value: number) => {
        console.log(value)
        setQuantity(Array.from({ length: value }, (_, index) => ({ number: index + 1 })));
    }

    const handleFolder = (value: string | null) => {
        setValue("folder", value ?? "");
        setValue("number", "");
    }

    const handleNumber = (value?: number) => {
        setValue("number", value ?? 0);
    }

    return {
        folder,
        number,
        quantity,
        handleQuantity,
        handleFolder,
        handleNumber
    }
}

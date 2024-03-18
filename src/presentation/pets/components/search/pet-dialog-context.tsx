import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ReturnType, useBoolean } from '../../../../hooks/use-boolean';
import { Pet } from '../../../../modules/pets/domain/pet';

type PetDialogContextTypes = ReturnType & {
    pet: Pet | null;
    index: number;
    handlePet: (updated: Pet | null) => void;
    handleIndex: (index: number) => void;
}

type Props = {
    children: ReactNode;
    value?: boolean;
}

const PetDialogContext = createContext<PetDialogContextTypes>({} as PetDialogContextTypes);

export const PetDialogProvider = ({ children, value = false }: Props) => {
    const boolean = useBoolean(value);
    const [pet, setPet] = useState<Pet | null>(null);
    const [index, setIndex] = useState<number>(0);

    const handleIndex = (i: number) => {
        setIndex(i);
    }

    const handlePet = (updatedClient: Pet | null) => {
        setPet(updatedClient)
    }
    const memo = useMemo(() => ({ ...boolean, pet, handlePet, handleIndex, index }), [boolean, pet, handlePet, handleIndex, index]);

    return (
        <PetDialogContext.Provider value={memo}>
            {children}
        </PetDialogContext.Provider>
    )
}


export const usePetDialogContext = () => {
    const context = useContext(PetDialogContext);
    if (context.onTrue === undefined) throw new Error("No esta declarado el PetDialogContext");

    return context
}
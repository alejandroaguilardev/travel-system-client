import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ReturnType, useBoolean } from '../../../../hooks/use-boolean';
import { Pet } from '../../../../modules/pets/domain/pet';

type PetDialogContextTypes = ReturnType & {
    pet: Pet | null;
    handlePet: (updated: Pet | null) => void;
}

type Props = {
    children: ReactNode;
    value?: boolean;
}

const PetDialogContext = createContext<PetDialogContextTypes>({} as PetDialogContextTypes);

export const PetDialogProvider = ({ children, value = false }: Props) => {
    const boolean = useBoolean(value);
    const [pet, setPet] = useState<Pet | null>(null);

    const handlePet = (updatedClient: Pet | null) => {
        setPet(updatedClient)
    }
    const memo = useMemo(() => ({ ...boolean, pet, handlePet }), [boolean, pet, handlePet]);

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
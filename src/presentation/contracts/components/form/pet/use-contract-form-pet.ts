import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import uuid from '../../../../../modules/shared/infrastructure/adapter/uuid';
import { ContractDetail, NewContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Pet } from '../../../../../modules/pets/domain/pet';
import { usePetDialogContext } from '../../../../pets/components/search/pet-dialog-context';
import { detailInit } from '../contract-validations';


export const useContractFormPet = () => {
    const { getValues, setValue, watch } = useFormContext();
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const details: NewContractDetail[] = watch("details");
    const { pet: petContext, handleIndex, index: indexContext } = usePetDialogContext();

    const clientId = watch("client");

    const handleNewPet = (index: number, pet?: Pet | null) => {
        details[index].pet = pet ?? undefined;
        setSelectedPet(pet ?? null)
        handleIndex(index);
        setValue("details", details)
    }

    useEffect(() => {
        if (petContext) {
            setSelectedPet(petContext);
            handleNewPet(indexContext, petContext);
        }

    }, [petContext, indexContext])

    const addPet = () => {

        const details: ContractDetail[] = getValues("details") || [];

        setValue("details", [
            ...details,
            {
                ...detailInit,
                pet: undefined,
                id: uuid.generate(),
                cage: {
                    ...detailInit.cage,
                },
            }
        ]);
    }

    const removePet = (detail: NewContractDetail) => {
        const details: NewContractDetail[] = getValues("details") ?? [];
        setValue("details", details.filter(_ => _.id !== detail.id));
    }

    return {
        clientId,
        selectedPet,
        details,
        handleNewPet,
        addPet,
        removePet,
    }
}

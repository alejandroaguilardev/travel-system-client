import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import uuid from '../../../../../modules/shared/infrastructure/adapter/uuid';
import { ContractDetail, NewContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { Pet } from '../../../../../modules/pets/domain/pet';
import { useMessage } from '../../../../../hooks/use-message';

const certificate: DocumentationCertificate = {
    hasServiceIncluded: false,
    isApplied: false,
    expectedDate: new Date(),
    executionDate: null,
    user: ""
}

const detailInit: NewContractDetail = {
    id: "",
    cage: {
        chosen: {
            dimensionsCage: "",
            modelCage: "",
            typeCage: "",
        },
        hasServiceIncluded: false,
        status: "pending",
        recommendation: {
            dimensionsCage: "",
            modelCage: "",
            typeCage: ""
        }
    },
    pet: {} as Pet,
    travel: {
        hasServiceIncluded: false,
        hasServiceAccompanied: false,
        typeTraveling: "accompanied",
    },
    documentation: {
        status: 'none',
        vaccinationCertificate: { ...certificate },
        healthCertificate: { ...certificate },
        chipCertificate: { ...certificate },
        senasaDocuments: { ...certificate },
        rabiesSeroLogicalTest: { ...certificate },
        importLicense: { ...certificate },
        emotionalSupportCertificate: { ...certificate },
    },
}

export const useContractFormPet = () => {
    const { showNotification } = useMessage();
    const { getValues, setValue, watch } = useFormContext();
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const details: NewContractDetail[] = watch("details");

    const clientId = watch("client");

    const handleNewPet = (pet: Pet) => {
        setSelectedPet(pet);
    }

    const addPet = (pet: Pet | null) => {
        if (!pet) {
            showNotification("Debe seleccionar una mascota", { variant: "error" })
            return;
        }

        const details: ContractDetail[] = getValues("details") || [];

        if (details.find(detail => detail.pet.id === pet.id)) {
            return;
        }

        setValue("details", [
            ...details,
            {
                ...detailInit,
                pet,
                id: uuid.generate(),
                cage: {
                    ...detailInit.cage,
                    recommendation: {
                        dimensionsCage: pet?.cageRecommendation?.dimensionsCage ?? "",
                        modelCage: pet?.cageRecommendation?.modelCage ?? "",
                        typeCage: pet?.cageRecommendation?.typeCage ?? ""
                    }
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

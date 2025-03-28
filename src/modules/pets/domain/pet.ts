import { Status } from "../../shared/domain/status";
import { PetGender } from "./pet-gender";
import { CageChosen } from '../../contracts/domain/contract-services/cage/cage-chosen';
import { MeasurementsAndWeight } from "./pet-measurements-and-weight";
import { ContractTopico } from '../../contracts/domain/contract-services/topico/contract-topico';

export interface Pet {
    id: string;
    name: string;
    race: string;
    gender: PetGender;
    birthDate: Date;
    chip: string;
    chipDate: Date | null;
    color: string;
    image?: string;
    country: string;
    type: string;
    sterilized: string;
    status?: Status;
    adopter: string;
    user?: string;
    cageRecommendation?: CageChosen;
    measurementsAndWeight?: MeasurementsAndWeight;
    isBrachycephalic: boolean;
    isPotentiallyDangerous: boolean;
    topico?: Omit<ContractTopico, "chipReview">;
    isPuppy?: boolean;
}

export interface NewPet extends Omit<Pet, 'id' | 'chip' | 'chipDate' | 'status' | 'user' | "cageRecommendation" | "measurementsAndWeight" | "topico"> {
    id?: string;
    chip?: string;
    chipDate?: Date | null;
};

export interface ClientPetsResponse {
    id: string;
    name: string;
    chip?: string;
}

export interface PetTopic extends NewPet {
    cageRecommendation: CageChosen;
    measurementsAndWeight: MeasurementsAndWeight;

}

export const isPetValidateDataCompleted = (pet?: Pet): boolean => {
    if (!pet) {
        return false;
    }

    return (
        !!pet.id &&
        !!pet.name &&
        !!pet.race &&
        !!pet.gender &&
        !!pet.birthDate &&
        !!pet.chip &&
        !!pet.chipDate !== null &&
        !!pet.color &&
        !!pet.type
    );
}
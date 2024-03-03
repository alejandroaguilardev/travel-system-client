import { Status } from "../../shared/domain/status";
import { PetGender } from "./pet-gender";
import { CageChosen } from '../../contracts/domain/contract-services/cage/cage-chosen';

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
}

export interface NewPet extends Omit<Pet, 'id' | 'chip' | 'chipDate' | 'status' | 'user'> {
    id?: string;
    chip?: string;
    chipDate?: Date | null;
};

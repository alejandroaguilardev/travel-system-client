import { ProfileDocument } from "./profile/profile-document";
import { UserGender } from "./user-gender";

export interface ProfileInterface {
    document: ProfileDocument;
    documentNumber: string;
    name: string;
    secondName?: string;
    lastName: string;
    secondLastName?: string;
    phone: string;
    gender?: UserGender;
    birthDate?: Date;
    department?: string;
    province?: string;
    district?: string;
    direction?: string;
}

export type ProfileClient = {
    phone: string;
}
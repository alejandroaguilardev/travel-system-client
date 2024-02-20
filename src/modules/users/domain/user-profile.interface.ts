import { UserGender } from "./user-gender";

export interface ProfileInterface {
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

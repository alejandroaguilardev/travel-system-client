import { User } from '../../../../modules/users/domain/user';

interface FilterProperty {
    field: keyof User | string;
    value: string;
}

export const userGlobalFilterProperties: FilterProperty[] = [
    { field: "profile.name", value: "string" },
    { field: "profile.lastName", value: "string" },
    { field: "profile.secondName", value: "string" },
    { field: "profile.lastName", value: "string" },
    { field: "profile.secondLastName", value: "string" },
    { field: "email", value: "string" },
];
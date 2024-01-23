import { User } from '../../../../modules/users/domain/user';

interface FilterProperty {
    field: keyof User;
    value: string;
}

export const userGlobalFilterProperties: FilterProperty[] = [
    { field: "name", value: "string" },
    { field: "lastName", value: "string" },
    { field: "secondName", value: "string" },
    { field: "lastName", value: "string" },
    { field: "secondLastName", value: "string" },
    { field: "email", value: "string" },
];
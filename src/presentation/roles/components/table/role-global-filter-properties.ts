import { Role } from '../../../../modules/roles/domain/role';

interface FilterProperty {
    field: keyof Role;
    value: string;
}

export const userGlobalFilterProperties: FilterProperty[] = [
    { field: "name", value: "string" },
    { field: "description", value: "string" }
];
import { Permission } from '../../../../modules/permissions/domain/permission';

interface FilterProperty {
    field: keyof Permission;
    value: string;
}

export const userGlobalFilterProperties: FilterProperty[] = [
    { field: "name", value: "string" },
];
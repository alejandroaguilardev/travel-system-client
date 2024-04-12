import { Contract } from '../../../../modules/contracts/domain/contract';

interface FilterProperty {
    field: keyof Contract | string;
    value: string;
}

export const contractGlobalFilterProperties: FilterProperty[] = [
    { field: "number", value: "string" },
    { field: "status", value: "string" },
    { field: "client.profile.name", value: "string" },
    { field: "client.profile.lastName", value: "string" },
    { field: "client.profile.documentNumber", value: "string" },
];
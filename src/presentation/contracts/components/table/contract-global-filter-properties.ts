import { Contract } from '../../../../modules/contracts/domain/contract';

interface FilterProperty {
    field: keyof Contract;
    value: string;
}

export const contractGlobalFilterProperties: FilterProperty[] = [
    { field: "number", value: "string" },
    { field: "guideNumber", value: "string" },
];
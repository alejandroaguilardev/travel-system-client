import { Cage } from '../../../../modules/cages/domain/cage';

interface FilterProperty {
    field: keyof Cage;
    value: string;
}

export const cageGlobalFilterProperties: FilterProperty[] = [
    { field: "typeCage", value: "string" },
    { field: "modelCage", value: "string" },
    { field: "dimensionsCage", value: "string" }
];
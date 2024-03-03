import { Pet } from '../../../../modules/pets/domain/pet';

interface FilterProperty {
    field: keyof Pet;
    value: string;
}

export const petGlobalFilterProperties: FilterProperty[] = [
    { field: "chip", value: "string" },
    { field: "name", value: "string" },
    { field: "race", value: "string" },
    { field: "color", value: "string" },
];
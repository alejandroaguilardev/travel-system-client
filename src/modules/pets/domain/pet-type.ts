export const PET_TYPES = [
    { value: "Canino", label: "Canino" },
    { value: "Felino", label: "Felino" },
    { value: "Hurón", label: "Hurón" },
    { value: "Otros", label: "Otros" }
] as const;
export type PetTypes = typeof PET_TYPES;


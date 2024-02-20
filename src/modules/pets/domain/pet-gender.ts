export type PetGender = "male" | "female";

export const PET_GENDERS: Record<PetGender, string> = {
    male: "Macho",
    female: "Hembra",
} as const;
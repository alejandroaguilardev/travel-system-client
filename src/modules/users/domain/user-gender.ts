export type UserGender = "male" | "female";

export const userGenders: Record<UserGender, string> = {
    male: "Hombre",
    female: "Mujer"
} as const;
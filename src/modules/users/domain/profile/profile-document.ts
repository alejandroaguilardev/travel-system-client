export const PROFILE_DOCUMENT = ["D.N.I.", "PASAPORTE", "C.E."] as const;

export type ProfileDocument = typeof PROFILE_DOCUMENT[number];

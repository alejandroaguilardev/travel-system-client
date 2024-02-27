export const PROFILE_DOCUMENT = ["D.N.I.", "PASAPORTE", "C.E.", "R.U.C."] as const;

export type ProfileDocument = typeof PROFILE_DOCUMENT[number];

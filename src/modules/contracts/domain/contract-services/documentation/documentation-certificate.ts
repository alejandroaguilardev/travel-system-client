export interface DocumentationCertificate {
    hasServiceIncluded: boolean;
    isRequired: boolean;
    isApplied: boolean;
    expectedDate: Date | null;
    executionDate: Date | null;
    resultDate: Date | null;
    observation?: string;
    isPrint?: boolean;
    user?: string;
};


export const DOCUMENTATION_APPLIED: { applied: string, notApplied: string } = {
    applied: "Confirmado",
    notApplied: "No Confirmado"
}

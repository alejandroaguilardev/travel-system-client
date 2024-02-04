export interface DocumentationCertificate {
    hasServiceIncluded: boolean;
    isApplied: boolean;
    expectedDate: Date;
    executionDate: Date | null;
    user?: string;
};


export const DOCUMENTATION_APPLIED: { applied: string, notApplied: string } = {
    applied: "Confirmado",
    notApplied: "No Confirmado"
}

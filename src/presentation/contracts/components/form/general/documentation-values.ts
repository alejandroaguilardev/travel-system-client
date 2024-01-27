export type DocumentationSwitches = {
    name: string;
    label: string;
}

export const documentationSwitches: DocumentationSwitches[] = [
    {
        name: 'vaccinationCertificate',
        label: 'Certificado de vacuna'
    },
    {
        name: 'healthCertificate',
        label: 'Certificado de salud'
    },
    {
        name: 'chipCertificate',
        label: 'Certificado de chip'
    },
    {
        name: 'senasaDocuments',
        label: 'Documentos de SENASA'
    },
    {
        name: 'rabiesSeroLogicalTest',
        label: 'Test serológico de rabia'
    },
    {
        name: 'importLicense',
        label: 'Permiso de importación'
    },
    {
        name: 'emotionalSupportCertificate',
        label: 'Certificado de soporte emocional'
    }
];

export const documentationSwitchesName = documentationSwitches.map(_ => _.name)

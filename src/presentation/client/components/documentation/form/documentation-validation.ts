import * as Yup from 'yup';
import { DocumentationDefinition } from '../../../../../modules/contracts/domain/interfaces/documentation';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';

export const documentationSchema: Yup.ObjectSchema<DocumentationDefinition> = Yup.object().shape({
    status: Yup.string().required('Campo requerido').oneOf(CONTRACT_STATUS.map((status) => status.value)),
    vaccinationCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
    healthCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
    chipCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
    senasaDocuments: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
    rabiesSeroLogicalTest: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
    importLicense: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
    emotionalSupportCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
    }),
});

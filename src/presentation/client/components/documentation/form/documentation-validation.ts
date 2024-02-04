import * as Yup from 'yup';
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';

export const documentationSchema: Yup.ObjectSchema<Documentation> = Yup.object().shape({
    status: Yup.string().required('Campo requerido').oneOf(CONTRACT_STATUS.map((status) => status.value)),
    vaccinationCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
    healthCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
    chipCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
    senasaDocuments: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
    rabiesSeroLogicalTest: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
    importLicense: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
    emotionalSupportCertificate: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        isApplied: Yup.boolean().required('Campo requerido'),
        expectedDate: Yup.date().required('La fecha esperada es requerida'),
        executionDate: Yup.date().required('Campo requerido').nullable(),
        user: Yup.string(),
    }),
});

import * as Yup from 'yup';
import { DocumentationCertificate } from '../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';

export const certificateSchema: Yup.ObjectSchema<DocumentationCertificate> = Yup.object().shape({
    hasServiceIncluded: Yup.boolean().required('Campo requerido'),
    isApplied: Yup.boolean().required('Campo requerido'),
    expectedDate: Yup.date().nullable().required('La fecha esperada es requerida'),
    executionDate: Yup.date().nullable(),
    resultDate: Yup.date().nullable(),
    isRequired: Yup.boolean().required('Campo requerido'),
    isPrint: Yup.boolean(),
    observation: Yup.string(),
    user: Yup.string(),
});

export const defaultValues: DocumentationCertificate = {
    hasServiceIncluded: false,
    isApplied: false,
    expectedDate: null,
    executionDate: null,
    resultDate: null,
    isRequired: false,
    isPrint: false,
    observation: "",
    user: "",
}

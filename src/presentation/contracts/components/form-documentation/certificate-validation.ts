import * as Yup from 'yup';
import { DocumentationCertificate } from '../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';

export const certificateSchema: Yup.ObjectSchema<DocumentationCertificate> = Yup.object().shape({
    hasServiceIncluded: Yup.boolean().required('Campo requerido'),
    isApplied: Yup.boolean().required('Campo requerido'),
    expectedDate: Yup.date().required('La fecha esperada es requerida'),
    executionDate: Yup.date().required('Campo requerido').nullable(),
    resultDate: Yup.date().required('Campo requerido').nullable(),
    isRequired: Yup.boolean().required('Campo requerido'),
    isPrint: Yup.boolean().required("eliminar"),
    observation: Yup.string().required("eliminar"),
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

import * as Yup from 'yup';
import { NewContract } from '../../../../modules/contracts/domain/contract';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { TRAVEL_TYPES, TypeTraveling } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { DocumentationCertificate } from '../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { documentationSchema } from '../../../client/components/documentation/form/documentation-validation';
import { CAGE_TYPE } from '../../../../modules/cages/domain/cage-type';

const certificate: DocumentationCertificate = {
    hasServiceIncluded: false,
    isApplied: false,
    expectedDate: new Date(),
    executionDate: null,
    user: ""
}

const defaultValues: NewContract = {
    id: '',
    client: '',
    number: '',
    startDate: new Date(),
    pets: [],
    cage: {
        status: 'none',
        hasServiceIncluded: false,
        chosen: {
            modelCage: '',
            dimensionsCage: '',
            typeCage: '',
        },
        recommendation: '',
    },
    documentation: {
        status: 'none',
        vaccinationCertificate: { ...certificate },
        healthCertificate: { ...certificate },
        chipCertificate: { ...certificate },
        senasaDocuments: { ...certificate },
        rabiesSeroLogicalTest: { ...certificate },
        importLicense: { ...certificate },
        emotionalSupportCertificate: { ...certificate },
    },
    travel: {
        hasServiceIncluded: false,
        hasServiceAccompanied: false,
        typeTraveling: 'accompanied',
    },
};

const contractSchema: Yup.ObjectSchema<NewContract> = Yup.object().shape({
    id: Yup.string(),
    client: Yup.string().required('El cliente es requerido'),
    number: Yup.string().required('El número de contrato es requerido'),
    startDate: Yup.date().required('La fecha de inicio es requerida'),
    pets: Yup.array(),
    cage: Yup.object().shape({
        status: Yup.string().required('Campo requerido').oneOf(CONTRACT_STATUS.map((status) => status.value)),
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        chosen: Yup.object().shape({
            modelCage: Yup.string(),
            dimensionsCage: Yup.string(),
            typeCage: Yup.string().oneOf(['', ...CAGE_TYPE] as const),
            user: Yup.string(),
        }),
        recommendation: Yup.string(),
    }),
    documentation: documentationSchema,
    travel: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        hasServiceAccompanied: Yup.boolean().required('Campo requerido'),
        typeTraveling: Yup.string().required('Campo requerido').oneOf(
            ['none' as TypeTraveling, ...TRAVEL_TYPES.map((type) => type.value)], "No es una opción válida"),
    }),
});

export { defaultValues, contractSchema };

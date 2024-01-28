import * as Yup from 'yup';
import { NewContract } from '../../../../modules/contracts/domain/contract';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { TRAVEL_TYPES } from '../../../../modules/contracts/domain/travel/contract-travel';
import { TypeTraveling } from '../../../../modules/contracts/domain/interfaces/travel';
import { TYPE_CAGE } from '../../../../modules/contracts/domain/cage/cage-chosen';

const defaultValues: NewContract = {
    id: '',
    client: '',
    number: '',
    startDate: new Date(),
    pets: [],
    cage: {
        status: 'none',
        hasServiceIncluded: false,
        swornDeclaration: false,
        chosen: {
            modelCage: '',
            dimensionsCage: '',
            typeCage: '',
        },
        recommendation: '',
    },
    documentation: {
        status: 'none',
        vaccinationCertificate: {
            hasServiceIncluded: false,
            isApplied: false,
        },
        healthCertificate: {
            hasServiceIncluded: false,
            isApplied: false,
        },
        chipCertificate: {
            hasServiceIncluded: false,
            isApplied: false,
        },
        senasaDocuments: {
            hasServiceIncluded: false,
            isApplied: false,
        },
        rabiesSeroLogicalTest: {
            hasServiceIncluded: false,
            isApplied: false,
        },
        importLicense: {
            hasServiceIncluded: false,
            isApplied: false,
        },
        emotionalSupportCertificate: {
            hasServiceIncluded: false,
            isApplied: false,
        },
    },
    travel: {
        hasServiceIncluded: false,
        typeTraveling: 'none',
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
        swornDeclaration: Yup.boolean().required('Campo requerido'),
        chosen: Yup.object().shape({
            modelCage: Yup.string(),
            dimensionsCage: Yup.string(),
            typeCage: Yup.string().oneOf(['', ...TYPE_CAGE] as const),
        }),
        recommendation: Yup.string(),
    }),
    documentation: Yup.object().shape({
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
    }),
    travel: Yup.object().shape({
        hasServiceIncluded: Yup.boolean().required('Campo requerido'),
        typeTraveling: Yup.string().required('Campo requerido').oneOf(
            ['none' as TypeTraveling, ...TRAVEL_TYPES.map((type) => type.value)], "No es una opción válida"),
    }),
});

export { defaultValues, contractSchema };

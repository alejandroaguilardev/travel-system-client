import * as Yup from 'yup';
import { NewContract } from '../../../../modules/contracts/domain/contract';
import { DocumentationCertificate } from '../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { NewContractDetail } from '../../../../modules/contracts/domain/contract-detail';

const certificate: DocumentationCertificate = {
    hasServiceIncluded: false,
    isApplied: false,
    expectedDate: new Date(),
    executionDate: null,
    resultDate: null,
    user: ""
}

const detailInit: NewContractDetail = {
    id: "",
    cage: {
        chosen: {
            dimensionsCage: "",
            modelCage: "",
            typeCage: "",
        },
        hasServiceIncluded: false,
        status: "pending",
        confirmation: false,
        petTravelAcquisition: false,

    },
    pet: undefined,
    travel: {
        hasServiceIncluded: false,
        hasServiceAccompanied: false,
        typeTraveling: "accompanied",
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
}

const defaultValues: NewContract = {
    id: '',
    client: '',
    folder: "",
    number: "",
    startDate: new Date(),
    details: [{ ...detailInit }],
    adviser: '',
    price: 0,
    customerPayments: [],
    payInInstallments: [],

};

const contractSchema: Yup.ObjectSchema<NewContract> = Yup.object().shape({
    id: Yup.string(),
    folder: Yup.string(),
    number: Yup.string(),
    client: Yup.string().required('El cliente es requerido'),
    startDate: Yup.date().required('La fecha de inicio es requerida'),
    details: Yup.array().required('Los detalles del contrato son requeridos'),
    adviser: Yup.string().required('Debe indicar el asesor del cliente'),
    customerPayments: Yup.array(),
    payInInstallments: Yup.array(),
    price: Yup.number().required('Se debe especificar el precio del contrato').min(1, "El precio debe ser mayor a 0"),
});

export { defaultValues, contractSchema, detailInit };

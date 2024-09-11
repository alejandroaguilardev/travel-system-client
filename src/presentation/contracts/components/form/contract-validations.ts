import * as Yup from 'yup';
import { NewContract } from '../../../../modules/contracts/domain/contract';
import { DocumentationCertificate } from '../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { NewContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { fDaySum } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';

const certificate: DocumentationCertificate = {
    hasServiceIncluded: false,
    isRequired: true,
    isApplied: false,
    expectedDate: new Date(),
    executionDate: null,
    resultDate: null,
    isPrint: false,
    observation: ""
}

export interface NewContractEmail extends NewContract {
    hasSendEmail?: boolean;
    isEdit?: boolean;
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
        isCabinTransporting: false,

    },
    pet: undefined,
    travel: {
        status: "pending",
        hasServiceIncluded: false,
        hasServiceAccompanied: false,
        typeTraveling: "accompanied",
        airlineReservation: {
            code: "",
            flightNumber: "",
            departureAirport: "",
            destinationAirport: "",
            departureDate: null,
            arrivalDate: null,
            itinerary: "",
            archive: ""
        },
        petPerCharge: {
            name: "",
            document: "",
            documentNumber: "",
            phone: "",
            email: "",
        },
        accompaniedPet: {
            name: "",
            document: "",
            documentNumber: "",
            phone: "",
            email: "",
            direction: "",
            district: "",
            province: "",
            department: "",
            image: ""
        },
        destination: {
            countryDestination: "",
            cityDestination: "",
            directionDestination: "",
        },
        guideNumber: '',
        observation: '',
    },
    documentation: {
        status: 'none',
        clientStatus: 'none',
        vaccinationCertificate: { ...certificate, },
        healthCertificate: { ...certificate },
        chipCertificate: { ...certificate },
        senasaDocuments: { ...certificate },
        rabiesSeroLogicalTest: { ...certificate },
        importLicense: { ...certificate },
        emotionalSupportCertificate: { ...certificate, isRequired: false },
    },
    topico: {
        chip: {
            hasIncluded: false,
        },
        vaccination: {
            hasIncluded: false,
        },
        chipReview: {
            hasIncluded: false,
        },
        rabiesVaccination: {
            hasIncluded: false,
        },
        rabiesReVaccination: {
            hasIncluded: false,
        },
        takingSampleSerologicalTest: {
            hasIncluded: false,
        },
    }

}

const defaultValues: NewContractEmail = {
    id: '',
    client: '',
    folder: "",
    number: "",
    startDate: new Date(),
    estimatedDate: fDaySum(new Date(), 180),
    details: [{ ...detailInit }],
    adviser: '',
    price: 0,
    payInInstallments: [],
    reasonForCancellation: "",
    format: "",
    hasSendEmail: false,
    isEdit: false,
};


const contractSchema: Yup.ObjectSchema<NewContractEmail> = Yup.object().shape({
    id: Yup.string(),
    folder: Yup.string(),
    format: Yup.string().required('El formato de contrato es requerido'),
    number: Yup.string(),
    client: Yup.string().required('El cliente es requerido'),
    startDate: Yup.date().required('La fecha de inicio es requerida'),
    estimatedDate: Yup.date().required('La fecha estimada de viaje es requerida'),
    details: Yup.array().required('Los detalles del contrato son requeridos'),
    adviser: Yup.string().required('Debe indicar el asesor del cliente'),
    reasonForCancellation: Yup.string(),
    user: Yup.string(),
    customerPayments: Yup.array(),
    payInInstallments: Yup.array(),
    price: Yup.number().required('Se debe especificar el precio del contrato').min(1, "El precio debe ser mayor a 0"),
    hasSendEmail: Yup.boolean(),
    isEdit: Yup.boolean(),


});

export { defaultValues, contractSchema, detailInit };

import * as Yup from 'yup';
import { TravelAccompaniedPet } from '../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from '../../../../modules/contracts/domain/contract-services/travel/travel-destination';
import { TravelPetPerCharge } from '../../../../modules/contracts/domain/contract-services/travel/travel-pet-per-charge';

export interface TravelAccompaniedSchema {
    petPerCharge: TravelPetPerCharge;
    accompaniedPet: TravelAccompaniedPet;
    destination: TravelDestination;
}

export const defaultValues: TravelAccompaniedSchema = {
    accompaniedPet: {
        name: '',
        document: 'D.N.I.',
        documentNumber: '',
        phone: '',
        email: '',
        direction: '',
        district: '',
        province: '',
        department: '',
    },
    destination: {
        countryDestination: '',
        cityDestination: '',
        directionDestination: '',
    },
    petPerCharge: {
        name: '',
        document: 'D.N.I.',
        documentNumber: '',
        phone: '',
        email: '',
    },
};

export const accompaniedPetSchema: Yup.ObjectSchema<TravelAccompaniedPet> = Yup.object().shape({
    name: Yup.string().required('El nombre es un campo obligatorio'),
    document: Yup.string().required('El documento es un campo obligatorio'),
    documentNumber: Yup.string().required('El número de documento es un campo obligatorio'),
    phone: Yup.string().required('El teléfono es un campo obligatorio'),
    email: Yup.string().email('Formato de correo electrónico no válido').required('El correo electrónico es un campo obligatorio'),
    direction: Yup.string().required('La dirección es un campo obligatorio'),
    district: Yup.string().required('El distrito es un campo obligatorio'),
    province: Yup.string().required('La provincia es un campo obligatorio'),
    department: Yup.string().required('El departamento es un campo obligatorio'),
});


export const destinationSchema: Yup.ObjectSchema<TravelDestination> = Yup.object().shape({
    countryDestination: Yup.string().required('El país de destino es un campo obligatorio'),
    cityDestination: Yup.string().required('La ciudad de destino es un campo obligatorio'),
    directionDestination: Yup.string().required('La dirección de destino es un campo obligatorio'),
});

export const petPerChargeSchema: Yup.ObjectSchema<TravelPetPerCharge> = Yup.object().shape({
    name: Yup.string().required('El nombre es un campo obligatorio'),
    document: Yup.string().required('El documento es un campo obligatorio'),
    documentNumber: Yup.string().required('El número de documento es un campo obligatorio'),
    phone: Yup.string().required('El teléfono es un campo obligatorio'),
    email: Yup.string().email('Formato de correo electrónico no válido').required('El correo electrónico es un campo obligatorio'),
});


export const travelAccompaniedSchema: Yup.ObjectSchema<TravelAccompaniedSchema> = Yup.object().shape({
    accompaniedPet: accompaniedPetSchema,
    destination: destinationSchema,
    petPerCharge: petPerChargeSchema
});

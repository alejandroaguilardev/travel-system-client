import * as Yup from 'yup';
import { TravelAccompaniedPet } from '../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from '../../../../modules/contracts/domain/contract-services/travel/travel-destination';
import { TravelPetPerCharge } from '../../../../modules/contracts/domain/contract-services/travel/travel-pet-per-charge';
import { Travel } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';

export interface TravelAccompaniedSchema {
    petPerCharge: Partial<TravelPetPerCharge>;
    accompaniedPet: TravelAccompaniedPet;
    destination: TravelDestination;
    observation?: string,
}

export const defaultValues: TravelAccompaniedSchema = {
    accompaniedPet: {
        name: '',
        document: 'PASAPORTE',
        documentNumber: '',
        phone: '',
        email: '',
        direction: '',
        district: '',
        province: '',
        department: '',
        image: '',
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
    observation: '',
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
    image: Yup.string(),
});


export const destinationSchema: Yup.ObjectSchema<TravelDestination> = Yup.object().shape({
    countryDestination: Yup.string().required('El país de destino es un campo obligatorio'),
    cityDestination: Yup.string().required('La ciudad de destino es un campo obligatorio'),
    directionDestination: Yup.string().required('La dirección de destino es un campo obligatorio'),
});

export const petPerChargeSchema: Yup.ObjectSchema<Partial<TravelPetPerCharge>> = Yup.object().shape({
    name: Yup.string(),
    document: Yup.string(),
    documentNumber: Yup.string(),
    phone: Yup.string(),
    email: Yup.string().email('Formato de correo electrónico no válido'),
});


export const travelAccompaniedSchema: Yup.ObjectSchema<TravelAccompaniedSchema> = Yup.object().shape({
    accompaniedPet: accompaniedPetSchema,
    destination: destinationSchema,
    petPerCharge: petPerChargeSchema,
    observation: Yup.string(),
});


export const getDefaultValues = (travel?: Travel) => ({
    accompaniedPet: {
        name: travel?.accompaniedPet?.name || defaultValues.accompaniedPet.name,
        document: travel?.accompaniedPet?.document || defaultValues.accompaniedPet.document,
        documentNumber: travel?.accompaniedPet?.documentNumber || defaultValues.accompaniedPet.documentNumber,
        phone: travel?.accompaniedPet?.phone || defaultValues.accompaniedPet.phone,
        email: travel?.accompaniedPet?.email || defaultValues.accompaniedPet.email,
        direction: travel?.accompaniedPet?.direction || defaultValues.accompaniedPet.direction,
        district: travel?.accompaniedPet?.district || defaultValues.accompaniedPet.district,
        province: travel?.accompaniedPet?.province || defaultValues.accompaniedPet.province,
        department: travel?.accompaniedPet?.department || defaultValues.accompaniedPet.department,
        image: travel?.accompaniedPet?.image || defaultValues.accompaniedPet.image,
    },
    destination: {
        countryDestination: travel?.destination?.countryDestination || defaultValues.destination.countryDestination,
        cityDestination: travel?.destination?.cityDestination || defaultValues.destination.cityDestination,
        directionDestination: travel?.destination?.directionDestination || defaultValues.destination.directionDestination,
    },
    petPerCharge: {
        name: travel?.petPerCharge?.name || defaultValues.petPerCharge.name,
        document: travel?.petPerCharge?.document || defaultValues.petPerCharge.document,
        documentNumber: travel?.petPerCharge?.documentNumber || defaultValues.petPerCharge.documentNumber,
        phone: travel?.petPerCharge?.phone || defaultValues.petPerCharge.phone,
        email: travel?.petPerCharge?.email || defaultValues.petPerCharge.email,
    },
    observation: travel?.observation || defaultValues.observation,
})
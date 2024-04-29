export interface TravelPetPerCharge {
    name: string;
    document: string;
    documentNumber: string;
    phone: string;
    email: string;
};


export const travelPetPerChargeValidate = (petPerCharge: TravelPetPerCharge): boolean => {
    return !!petPerCharge?.name &&
        !!petPerCharge?.document &&
        !!petPerCharge?.documentNumber &&
        !!petPerCharge?.phone &&
        !!petPerCharge?.email;
}

export interface TravelAccompaniedPet {
    name: string;
    document: string;
    documentNumber: string;
    phone: string;
    email: string;
    direction: string;
    district: string;
    province: string;
    department: string;
    image?: string;
};


export const travelAccompaniedPetValidate = (values: TravelAccompaniedPet): boolean => {
    const { name, document, documentNumber, phone, email, direction, district, province, department, image } = values;

    if (
        !!name &&
        !!document &&
        !!documentNumber &&
        !!phone &&
        !!email &&
        !!department &&
        !!province &&
        !!district &&
        !!direction &&
        !!image
    ) {
        return true;
    }
    return false;
}

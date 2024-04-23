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
};


export const travelAccompaniedPetValidate = (values: TravelAccompaniedPet): boolean => {
    const { name, document, documentNumber, phone, email, direction, district, province, department } = values;

    if (
        !name ||
        !document ||
        !documentNumber ||
        !phone ||
        !email ||
        !direction ||
        !district ||
        !province ||
        !department
    ) {
        return false;
    }
    return true;
}
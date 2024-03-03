
export interface TravelPetPerCharge {
    receptor: string;
    email: string;
    phone: string;
    pickupDateTime: Date | null;
    pickupLocation: string;
    specialRequests: string;
    user?: string;
};
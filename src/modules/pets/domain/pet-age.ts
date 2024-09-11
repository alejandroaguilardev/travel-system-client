import { PET_TYPES } from './pet-type';

const PET_TYPE_AGE_LIMITS = {
    Canino: { months: 12 },
    Felino: { months: 12 },
    Hurón: { months: 12 },
    Otros: { months: 12 }
};

export const isPetBabyAge = (type: typeof PET_TYPES[number]['value'], birthDate: Date): boolean => {
    const now = new Date();
    const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());

    const ageLimit = PET_TYPE_AGE_LIMITS[type]?.months || 12;

    return ageInMonths <= ageLimit;
};

export const isPrintMessageForMoreOneMonth = (birthDate: Date, daysSinceUpdate: number): boolean => {
    const now = new Date();
    const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());

    if (ageInMonths < 3) {
        return daysSinceUpdate > 7;
    } else if (ageInMonths >= 3 && ageInMonths < 6) {
        return daysSinceUpdate > 14;
    } else if (ageInMonths >= 6 && ageInMonths < 12) {
        return daysSinceUpdate > 30;
    }
    return false;
};

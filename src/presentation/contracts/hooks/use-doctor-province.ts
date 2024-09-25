import { useState } from "react"


export const useDoctorProvince = () => {
    const [isDoctorProvince, setIsDoctorProvince] = useState(false);

    const handleDoctorProvince = (value: boolean): void => {
        setIsDoctorProvince(value);
    }

    return {
        isDoctorProvince,
        handleDoctorProvince
    }
}

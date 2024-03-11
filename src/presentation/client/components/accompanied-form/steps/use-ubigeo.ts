import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DEPARTMENTS from '../../../../../../public/data/department.json'
import PROVINCES from '../../../../../../public/data/province.json'
import DISTRICTS from '../../../../../../public/data/district.json'

type Department = {
    id: string;
    name: string;
}


type District = {
    district_id: string;
    name: string;
    province_id: string;
    department_id: string;
}

type Province = {
    province_id: string;
    name: string;
    department_id: string;
}


export const useUbigeo = (field: string) => {
    const { setValue, watch } = useFormContext();

    const [provinces, setProvinces] = useState<Province[]>([]);

    const [districts, setDistricts] = useState<District[]>([]);

    const department = watch(`${field}.department`) || null;
    const province = watch(`${field}.province`) || null;
    const district = watch(`${field}.district`) || null;


    useEffect(() => {
        if (!department) {
            setValue(`${field}.department`, DEPARTMENTS[14].id);
            setProvinces(PROVINCES?.filter(_ => _.department_id === DEPARTMENTS[14].id))
        }
    }, []);

    useEffect(() => {
        if (department) {
            setProvinces(PROVINCES?.filter(_ => _.department_id === department));
        }
    }, []);

    useEffect(() => {
        if (province) {
            setDistricts(DISTRICTS?.filter(_ => _.province_id === province));
        }
    }, [])


    const handleDepartment = (value: Department) => {
        setValue(`${field}.department`, value.id);
        setValue(`${field}.province`, null);
        setValue(`${field}.district`, null);
    }

    const handleProvince = (value: Province) => {
        setValue(`${field}.province`, value.province_id);
        setValue(`${field}.district`, null);
    }

    const handleDistrict = (value: District) => {
        setValue(`${field}.district`, value.district_id);
    }

    const handleProvinces = (value?: string) => {
        setProvinces(value
            ? PROVINCES?.filter(_ => _.department_id === value)
            : []
        );
    }

    const handleDistricts = (value?: string) => {
        setDistricts(value
            ? DISTRICTS?.filter(_ => _.province_id === value)
            : []
        );
    }

    return {
        department,
        province,
        district,
        departments: DEPARTMENTS,
        provinces,
        districts,
        handleDepartment,
        handleProvince,
        handleProvinces,
        handleDistrict,
        handleDistricts,
    }
}

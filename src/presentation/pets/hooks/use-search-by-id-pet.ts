import { useState, useEffect } from 'react';
import { petService } from '../../../modules/pets/infrastructure/pets.service';
import { Pet } from '../../../modules/pets/domain/pet';

export const useSearchByIdPet = (petId: string) => {
    const [pet, setPet] = useState<Pet | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await petService.searchById<Pet>(petId);
            setPet(response);
        } catch (error) {
            setPet(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [petId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        pet: pet ?? undefined,
        isLoading,
        error,
        handleRefetch
    };
};

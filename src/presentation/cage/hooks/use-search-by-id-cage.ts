import { useState, useEffect } from 'react';
import { cageService } from '../../../modules/cages/infrastructure/cages.service';
import { Cage } from '../../../modules/cages/domain/cage';

export const useSearchByIdCage = (cageId: string) => {
    const [cage, setCage] = useState<Cage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await cageService.searchById<Cage>(cageId);
            setCage(response);
        } catch (error) {
            setCage(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [cageId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        cage: cage ?? undefined,
        isLoading,
        error,
        handleRefetch
    };
};

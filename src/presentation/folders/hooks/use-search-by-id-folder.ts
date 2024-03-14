import { useState, useEffect } from 'react';
import { folderService } from '../../../modules/folders/infrastructure/folders.service';
import { Folder } from '../../../modules/folders/domain/folder';

export const useSearchByIdFolder = (folderId: string) => {
    const [folder, setFolder] = useState<Folder | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await folderService.searchById<Folder>(folderId);
            setFolder(response);
        } catch (error) {
            setFolder(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [folderId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        folder: folder ?? undefined,
        isLoading,
        error,
        handleRefetch
    };
};

import React from 'react'
import NotFoundPage from '../../pages/404';


type Props = {
    children: React.ReactNode;
    data: boolean;
    isLoading: boolean;
    error: any;
};

export default function SearchIdNotFound({ children, isLoading, error, data }: Props) {
    if (!isLoading && (!data || error)) return <NotFoundPage />
    if (!isLoading) return <>{children}</>
    return <></>;

}

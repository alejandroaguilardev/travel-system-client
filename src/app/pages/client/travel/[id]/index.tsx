import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import AccompaniedPetView from '../../../../../presentation/client/views/accompanied-pet-view';
import NotFoundView from '../../../../../presentation/error/not-found-view';


export default function AccompaniedPage() {
    const params = useParams();
    const { contractId, contractDetailId, token } = params;

    if (!contractId || !contractDetailId || !token) return <NotFoundView />
    return (
        <>
            <Helmet>
                <title> Pet Accompanied- Acompañante de la mascota</title>
            </Helmet>

            <AccompaniedPetView
                contractId={contractId}
                contractDetailId={contractDetailId}
                token={token}
            />
        </>
    );
}

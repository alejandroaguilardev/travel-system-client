import { Helmet } from 'react-helmet-async';
import CageView from '../../../../presentation/cage/views/cage-view';


export default function CagePage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Jaulas</title>
            </Helmet>

            <CageView />
        </>
    );
}
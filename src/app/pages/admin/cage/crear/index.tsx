import { Helmet } from 'react-helmet-async';
import CageNewView from '../../../../../presentation/cage/views/cage-new-view';


export default function CageNewPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Crear Jaula</title>
            </Helmet>

            <CageNewView />
        </>
    );
}
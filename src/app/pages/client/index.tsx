import { Helmet } from 'react-helmet-async';
import ClientView from '../../../presentation/client/views/client-view';


export default function ClientPage() {
    return (
        <>
            <Helmet>
                <title> Pet travel- Inicio</title>
            </Helmet>

            <ClientView />
        </>
    );
}

import { Helmet } from 'react-helmet-async';
import ClientView from '../../../presentation/client/client-view';


export default function ClientPage() {
    return (
        <>
            <Helmet>
                <title> Pet travel cliente</title>
            </Helmet>

            <ClientView />
        </>
    );
}

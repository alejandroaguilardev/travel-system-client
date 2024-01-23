import { Helmet } from 'react-helmet-async';
import UserView from '../../../../presentation/users/views/user-view';


export default function ClientPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Clientes</title>
            </Helmet>

            <UserView />
        </>
    );
}
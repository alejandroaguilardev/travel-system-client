import { Helmet } from 'react-helmet-async';
import UserProfileView from '../../../../presentation/client/views/client-profile-view';


export default function ProfilePage() {

    return (
        <>
            <Helmet>
                <title> Perfil de usuario</title>
            </Helmet>
            <UserProfileView />
        </>
    );
}
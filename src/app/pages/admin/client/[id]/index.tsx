import { Helmet } from 'react-helmet-async';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';
import { AuthGroup } from '../../../../../modules/auth/domain/auth-permission';
import UserClientEditView from '../../../../../presentation/users/views/client/user-client-edit-view';
import UserClientIdView from '../../../../../presentation/users/views/client/user-client-id-view';


export default function UserClientIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard  Clientes</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={UserClientEditView}
                View={UserClientIdView}
                group={AuthGroup.CLIENT}
            />
        </>
    );
}
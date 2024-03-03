import { Helmet } from 'react-helmet-async';
import UserEditView from '../../../../../presentation/users/views/user/user-edit-view';
import UserIdView from '../../../../../presentation/users/views/user/user-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';
import { AuthGroup } from '../../../../../modules/auth/domain/auth-permission';


export default function UserIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard  Usuarios</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={UserEditView}
                View={UserIdView}
                group={AuthGroup.USERS}
            />
        </>
    );
}
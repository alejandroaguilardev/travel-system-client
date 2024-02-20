import { Helmet } from 'react-helmet-async';
import UserEditView from '../../../../../presentation/users/views/user/user-edit-view';
import UserIdView from '../../../../../presentation/users/views/user/user-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';


export default function UserIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard  Rol</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={UserEditView}
                View={UserIdView}
                group={AuthGroup.USERS}
            />
        </>
    );
}
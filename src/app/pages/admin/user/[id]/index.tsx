import { Helmet } from 'react-helmet-async';
import UserEditView from '../../../../../presentation/users/views/user-edit-view';
import UserIdView from '../../../../../presentation/users/views/user-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';


export default function UserIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Editar Rol</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={UserEditView}
                View={UserIdView}
            />
        </>
    );
}
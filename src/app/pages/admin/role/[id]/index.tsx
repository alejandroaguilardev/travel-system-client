import { Helmet } from 'react-helmet-async';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';
import RoleEditView from '../../../../../presentation/roles/views/role-edit-view';
import RoleIdView from '../../../../../presentation/roles/views/role-id-view';


export default function RoleIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Editar Rol</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={RoleEditView}
                View={RoleIdView}
            />
        </>
    );
}
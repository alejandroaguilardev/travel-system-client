import { Helmet } from 'react-helmet-async';
import PermissionEditView from '../../../../../presentation/permission/views/permission-edit-view';
import PermissionIdView from '../../../../../presentation/permission/views/permission-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';
import { AuthGroup } from '../../../../../modules/auth/domain/auth-permission';


export default function PermissionIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard  Permiso</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={PermissionEditView}
                View={PermissionIdView}
                group={AuthGroup.PERMISSIONS}
            />
        </>
    );
}
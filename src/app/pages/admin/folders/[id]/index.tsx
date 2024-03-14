import { Helmet } from 'react-helmet-async';
import FolderEditView from '../../../../../presentation/folders/views/folder-edit-view';
import FolderIdView from '../../../../../presentation/folders/views/folder-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';
import { AuthGroup } from '../../../../../modules/auth/domain/auth-permission';


export default function FolderIdPage() {
    return (
        <>
            <Helmet>
                <title>Expedientes</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={FolderEditView}
                View={FolderIdView}
                group={AuthGroup.FOLDERS}
            />
        </>
    );
}
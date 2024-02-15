import { Helmet } from 'react-helmet-async';
import CageEditView from '../../../../../presentation/cage/views/cage-edit-view';
import CageIdView from '../../../../../presentation/cage/views/cage-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';


export default function CageIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard  Jaulas</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={CageEditView}
                View={CageIdView}
            />
        </>
    );
}
import { useParams } from '../hooks';
import { RoutesActions } from '../types/routes-action';
import NotFoundView from '../../../presentation/error/not-found-view';

type Props = {
    Edit: React.FC<{ id: string }>;
    View: React.FC<{ id: string }>;
};

export default function SearchIdNotFoundParams({ Edit, View }: Props) {
    const params = useParams();
    const {id} = params;
    const action = params.action as RoutesActions;

    if (!id || !action || ![RoutesActions.EDIT, RoutesActions.VIEW].includes(action)) {
        return <NotFoundView />;
    }
    return action === RoutesActions.VIEW ? <View id={id} /> : <Edit id={id} />;
}

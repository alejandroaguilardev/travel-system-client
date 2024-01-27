import { Helmet } from 'react-helmet-async';
import HistoryView from '../../../../presentation/client/views/history-view';


export default function HistoryPage() {
    return (
        <>
            <Helmet>
                <title> Pet travel Historial de Operaciones</title>
            </Helmet>

            <HistoryView />
        </>
    );
}

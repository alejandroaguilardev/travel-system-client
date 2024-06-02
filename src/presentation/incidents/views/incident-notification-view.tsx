import { Container, Dialog } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { IncidentNotificationTable } from '../components/table/incident-notification-table';
import { useSelectedValue } from '../../../hooks/use-selected-value';
import { Incident } from '../../../modules/incidents/domain/incident';
import { IncidentDetail } from '../components/incident-detail/incident-detail';

export default function IncidentNotificationView() {
    const { selected, handleSelected } = useSelectedValue<Incident>();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Incidencias de Notificaciones"
                links={[
                    { name: 'Incidencias Notificaciones', href: paths.dashboard.incidents.notification },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            <IncidentNotificationTable handleSelected={handleSelected} />

            {selected &&
                <Dialog
                    open={!!selected}
                    onClose={() => handleSelected(null)}
                >
                    <IncidentDetail incident={selected} />
                </Dialog>
            }
        </Container>
    );
}


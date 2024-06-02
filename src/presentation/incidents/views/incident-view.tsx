import { Button, Container, Dialog, DialogContent } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { IncidentTable } from '../components/table/incident-table';
import { useSelectedValue } from '../../../hooks/use-selected-value';
import { Incident } from '../../../modules/incidents/domain/incident';
import { IncidentDetail } from '../components/incident-detail/incident-detail';

export default function IncidentView() {
    const { selected, handleSelected } = useSelectedValue<Incident>();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Incidencias"
                links={[
                    { name: 'Incidencias', href: paths.dashboard.incidents.root },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            <IncidentTable handleSelected={handleSelected} />

            {selected &&
                <Dialog
                    open={!!selected}
                    onClose={() => handleSelected(null)}
                    maxWidth="lg"
                >
                    <DialogContent sx={{ p: 4 }}>
                        <IncidentDetail incident={selected} />
                        <Button variant="outlined" color="secondary" onClick={() => handleSelected(null)} fullWidth sx={{ px: 4 }}>Cerrar</Button>
                    </DialogContent>
                </Dialog>
            }
        </Container>
    );
}


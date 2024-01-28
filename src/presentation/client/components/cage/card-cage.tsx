import { Card, Stack, Avatar, Divider, Typography, ListItemText, Box, Button, Alert, Chip } from '@mui/material';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { CageDefinition } from '../../../../modules/contracts/domain/interfaces/cage';
import { useBoolean } from '../../../../hooks/use-boolean';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { DialogContract } from '../dialog/dialog-contract';
import { CageForm } from './form/cage-form';

type Props = {
    cage: CageDefinition;
    contractId: string;
};

export default function CardCage({ cage, contractId }: Props) {
    const dialog = useBoolean();

    return (
        <>
            <Card onClick={dialog.onTrue}>
                <Stack sx={{ p: 3, pb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                            variant="rounded"
                            src="/assets/cage.png"
                            alt="jaula"
                            sx={{ width: 48, height: 48, mb: 2 }}
                        />
                        <Stack>
                            <ListItemText
                                sx={{ mb: 1 }}
                                primary="Requisito de la Jaula" primaryTypographyProps={{
                                    typography: 'subtitle1',
                                }}
                                secondary="Asegúrese de tener la jaula correcta, con las dimensiones correcta."
                                secondaryTypographyProps={{
                                    component: 'span',
                                    typography: 'caption',
                                    color: 'text.disabled',
                                }}
                            />
                        </Stack>

                    </Stack>
                    <Stack
                        spacing={0.5}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'primary.main', typography: 'caption' }}
                    >
                        <Label color={statusColor(cage.status)} width="100%" >
                            {CONTRACT_STATUS.find(_ => _.value === cage.status)?.label}
                        </Label>
                    </Stack>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {[
                    {
                        label: <Chip
                            label={`Tipo: ${cage.chosen?.typeCage ?? `-- --    -- --`}`}
                            variant="soft"
                            size='small'
                            color={cage.chosen?.typeCage ? "success" : "error"}
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start"
                            }} />
                    },
                    {
                        label: <Chip
                            label={`Modelo: ${cage.chosen?.modelCage ?? `-- --    -- --`}`}
                            variant="soft"
                            size='small'
                            color={cage.chosen?.typeCage ? "success" : "error"}
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start"
                            }} />
                    },
                    {
                        label: <Chip
                            label={`Dimensiones: ${cage.chosen?.dimensionsCage ?? `-- --    -- --`}`}
                            size='small'
                            variant="soft"
                            color={cage.chosen?.typeCage ? "success" : "error"}
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start"
                            }} />
                    },

                ].map((item, index) => (
                    <Stack
                        mb={1}
                        px={4}
                        key={index}
                        spacing={0.5}

                    >
                        <Typography variant="caption" width="100%" >
                            {item.label}
                        </Typography>
                    </Stack>
                ))}
                {
                    cage.hasServiceIncluded &&
                    <Stack
                        my={2}
                        px={4}
                        spacing={0.5}
                        flexShrink={0}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'text.disabled', minWidth: 0 }}

                    >
                        <Label width="100%" color={cage.swornDeclaration ? "success" : "error"} startIcon={<IconWrapper width={16} icon={cage.swornDeclaration ? "checkDoubleAll" : "removeFilled"} sx={{ flexShrink: 0 }} />} >
                            Declaración jurada
                        </Label>
                    </Stack>
                }


                <Box display="flex" justifyContent="center" my={2}>
                    {
                        cage.hasServiceIncluded ?
                            <Alert variant='outlined' sx={{ width: "90%" }}>Servicio Incluido con Pet Travel</Alert>
                            : <>
                                {cage.recommendation && <Alert variant='outlined' severity='info' sx={{ width: "90%" }}>Te recomendamos la jaula {cage.recommendation}</Alert>}
                            </>
                    }
                </Box>
            </Card >

            {dialog.value &&
                <DialogContract
                    title='Requisitos de la jaula'
                    open={dialog.value}
                    onClose={dialog.onFalse}
                >
                    <CageForm
                        onCancel={dialog.onFalse}
                        contractId={contractId}
                        cage={cage}
                        readonly={cage.hasServiceIncluded}
                    />

                </DialogContract>
            }

        </>
    );
}

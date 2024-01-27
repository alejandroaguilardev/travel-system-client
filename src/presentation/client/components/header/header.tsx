import { Divider, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import { useContractStore } from '../../../../state/contract/contract-store';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { fDateTime } from '../../../../modules/shared/infrastructure/helpers/format-time';


const Header = () => {
    const { contract } = useContractStore()
    return (
        <>
            <Box mb={1} display={{ xs: "block", md: "flex" }} justifyContent="space-between" alignItems="center">

                <ListItemText
                    primary={` N° de contrato: ${contract?.number}`}
                    secondary={`${fDateTime(contract?.startDate)}`}
                    primaryTypographyProps={{
                        typography: 'subtitle1',
                    }}
                    secondaryTypographyProps={{
                        mt: 1,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                    }}
                    sx={{
                        width: "100%",
                        mb: 1
                    }}
                />
                <ListItemText
                    sx={{
                        width: "100%",
                        textAlign: { xs: "left", md: "right" }
                    }}
                    primary={<> Número de guía: {contract?.guideNumber || "-- --"}</>}
                    primaryTypographyProps={{
                        typography: 'subtitle1',
                    }}
                />

            </Box>
            <Label color={contract?.status === "completed" ? "success" : "error"} width="100%" mb={1} sx={{ height: 40, fontWeight: "bold" }}  >
                {CONTRACT_STATUS.find(_ => contract?.status === _.value)?.label}
            </Label>
            <Divider sx={{ mb: 2 }} />
        </>
    )
}

export default Header
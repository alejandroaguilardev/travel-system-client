import { Divider, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import { useContractStore } from '../../../../state/contract/contract-store';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { fDateTimeLong } from '../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../components/label/label';
import { capitalize } from '../../../../modules/shared/domain/helpers/capitalize';


const Header = () => {
    const { contract, contractDetail } = useContractStore();

    return (
        <>
            <Box mb={1} display={{ xs: "block", md: "flex" }} justifyContent="space-between" alignItems="center">
                <ListItemText
                    primary={`Nombre: ${capitalize(contractDetail?.pet?.name || "Mascota")} `}
                    secondary={`N° de contrato: ${contract?.number}`}

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
                    primary={
                        contractDetail?.travel?.typeTraveling === "charge" ?
                            <>
                                Número de guía: {contractDetail?.guideNumber || "-- --"}
                            </>
                            : ""}
                    primaryTypographyProps={{
                        typography: 'subtitle1',
                    }}
                    secondary={`${contract?.startDate
                        ? fDateTimeLong(contract.startDate)
                        : ""}`}
                    secondaryTypographyProps={{
                        mt: 1,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
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
import { useFormContext } from "react-hook-form";
import { CSSProperties, FC, useEffect } from "react";
import { Box, Stack } from "@mui/material"
import RHFSwitch from '../../../../../../components/hook-form/rhf-switch';
import { fDayjs } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import { useAuthContext } from '../../../../../auth/hooks/use-auth-context';
import { RHFDate } from "../../../../../../components/hook-form/rhf-date";

type Props = {
    name: string;
    label: string;
    edit?: boolean;
    style?: CSSProperties;
    noExecutionDate?: boolean;
}

export const CertificateSwitch: FC<Props> = ({ name, label, edit, noExecutionDate = false, style = {} }) => {
    const { watch, setValue } = useFormContext();
    const { user } = useAuthContext();
    const hasServiceIncluded = watch(`${name}.hasServiceIncluded`);
    const isApplied = watch(`${name}.isApplied`);
    const expectedDate = watch(`${name}.expectedDate`);
    const executionDate = watch(`${name}.executionDate`);
    const resultDate = watch(`${name}.resultDate`);

    useEffect(() => {
        if (!hasServiceIncluded) {
            setValue(`${name}.expectedDate`, new Date());
        }
    }, [hasServiceIncluded])

    useEffect(() => {
        if (!isApplied) {
            setValue(`${name}.executionDate`, null);
            setValue(`${name}.user`, "");
        }
        if (isApplied && !executionDate) {
            setValue(`${name}.executionDate`, new Date());
            setValue(`${name}.user`, user?.id);
        }
    }, [isApplied])

    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} width="100%">
            <RHFSwitch
                name={edit ? `${name}.isApplied` : `${name}.hasServiceIncluded`}
                label={label}
                sx={{
                    width: "100%"
                }}
                style={style}
            />
            {(hasServiceIncluded || edit) &&
                <>
                    <RHFDate
                        name={`${name}.expectedDate`}
                        value={fDayjs(expectedDate)}
                        label="Fecha prevista (*)"

                        sx={edit ? {
                            opacity: 0.4,
                            pointerEvents: "not-allowed",
                            cursor: "not-allowed"
                        } : {}}
                    />
                    {
                        noExecutionDate && <RHFDate
                            name={`${name}.executionDate`}
                            value={fDayjs(executionDate)}
                            label="Fecha de Ejecución (*)"
                            sx={edit ? {
                                opacity: 0.4,
                                pointerEvents: "not-allowed",
                                cursor: "not-allowed"
                            } : {}}
                        />
                    }

                    {name === "rabiesSeroLogicalTest" ?
                        <RHFDate
                            name={`${name}.resultDate`}
                            value={fDayjs(resultDate)}
                            label="Fecha de muestra enviada (*)"
                            sx={{
                                ...style,
                                backgroundColor: watch(`${name}.resultDate`) ? "#98fb98" : "#f08080"
                            }}
                        />
                        : <Box width="100%" />
                    }
                </>
            }
        </Stack>
    )
}

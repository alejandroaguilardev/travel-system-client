import { CSSProperties, FC, useEffect } from "react";
import { Stack } from "@mui/material"
import RHFSwitch from '../../../../../../components/hook-form/rhf-switch';
import { useFormContext } from "react-hook-form";
import RHFTextField from '../../../../../../components/hook-form/rhf-text-field';
import { fDate } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import IconWrapper from '../../../../../../components/icon-wrapper/icon-wrapper';
import { useAuthContext } from '../../../../../auth/hooks/use-auth-context';

type Props = {
    name: string;
    label: string;
    edit?: boolean;
    style?: CSSProperties;
}

export const CertificateSwitch: FC<Props> = ({ name, label, edit, style = {} }) => {
    const { watch, setValue } = useFormContext();
    const { user } = useAuthContext();
    const hasServiceIncluded = watch(`${name}.hasServiceIncluded`);
    const isApplied = watch(`${name}.isApplied`);
    const expectedDate = watch(`${name}.expectedDate`);
    const executionDate = watch(`${name}.executionDate`);

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
                    <RHFTextField
                        name={`${name}.expectedDate`}
                        type='date'
                        value={fDate(expectedDate, 'yyyy-MM-dd')}
                        fullWidth
                        label="Fecha prevista (*)"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <IconWrapper icon="date" />,
                            sx: edit ? {
                                opacity: 0.4,
                                pointerEvents: "not-allowed",
                                cursor: "not-allowed"
                            } : {}
                        }}
                    />
                    <RHFTextField
                        name={`${name}.executionDate`}
                        type='date'
                        value={fDate(executionDate, 'yyyy-MM-dd')}
                        fullWidth
                        label="Fecha de Ejecución (*)"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <IconWrapper icon="date" />,
                            sx: style
                        }}
                    />
                </>
            }
        </Stack>
    )
}

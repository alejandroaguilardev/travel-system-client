import { Box, IconButton, TextField, TextFieldProps } from "@mui/material";
import { IconWrapper } from "../icon-wrapper";

interface Props {
    counter: number;
    callback: (counter: number) => void;
    textFieldProps?: TextFieldProps;
}

export const Counter = ({ counter, callback, textFieldProps }: Props) => {

    const handleCounter = (value: number) => {
        callback(value);
    }

    return (
        <Box display="flex" alignItems="center">
            <IconButton

                color="inherit"
                onClick={() => callback(counter - 1)}
                disabled={counter <= 1}
                sx={{
                    border: 0,
                }}
            >
                <IconWrapper icon='minusFill' />
            </IconButton>
            <TextField
                size='small'
                type="number"
                value={counter}
                sx={{
                    width: 43
                }}
                onChange={e => handleCounter(Number(e.target.value))}
                {...textFieldProps}
            />
            <IconButton
                color="inherit"
                onClick={() => callback(counter + 1)}

                sx={{
                    border: 0
                }}
            >
                <IconWrapper icon='plusFill' />
            </IconButton>
        </Box >
    )
}

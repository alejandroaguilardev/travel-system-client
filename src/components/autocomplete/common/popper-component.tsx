import { ListItem, Popper } from '@mui/material';

interface Props {
    size: number;
    countTotal: number;
    optionsLength: number;
    props: any;
}

export function PopperComponentAutocomplete({
    size = 10,
    countTotal,
    optionsLength,
    props
}: Props) {


    return (
        <Popper {...props} placement="bottom-start">
            {props.children}
            <ListItem
                sx={{
                    backgroundColor: 'white',
                    color: 'rgba(255, 0, 0, 0.5)',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontSize: 'small',
                }}
            >
                {optionsLength === size
                    ? `Se han mostrado ${optionsLength} de ${countTotal} resultados. Continúa escribiendo para ver más opciones disponibles.`
                    : `Se han mostrado todos los resultados disponibles para esta búsqueda. ${optionsLength} de ${countTotal} `}
            </ListItem>
        </Popper>
    )
}

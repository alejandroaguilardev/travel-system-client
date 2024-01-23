
export type TypeTraveling = "accompanied" | "charge" | "none";


export const TRAVEL_TYPES: { value: TypeTraveling, label: string }[] = [
    {
        value: "none",
        label: " NINGUNO"

    },
    {
        value: "accompanied",
        label: " VIAJE DE UNA MASCOTA  VIAJANDO EN BODEGA O EN CABINA POR UNA PERSONA"
    },
    {
        value: "charge",
        label: "VIAJE DE UNA MASCOTA POR CARGO"
    }
]
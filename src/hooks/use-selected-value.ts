import { useState } from "react"

export function useSelectedValue<T>() {
    const [selected, setSelected] = useState<T | null>(null)

    const handleSelected = (value: T | null) => {
        setSelected(value);
    }

    return {
        selected,
        handleSelected
    }
}
